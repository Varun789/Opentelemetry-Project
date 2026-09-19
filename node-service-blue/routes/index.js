const express = require("express");

const { trace, context } = require("@opentelemetry/api");

const router = express.Router();
const { MongoClient } = require("mongodb");
// adding manual instrumnetation so need api
const pkg = require("../package.json");
// created tracer

const uri = "mongodb://localhost";
const client = new MongoClient(uri);

// connect once for newer version
client
  .connect()
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.error("MongoDB connection failed", err));
// bring pakage

// Fibonacci function to simulate delay
function fibonacci(n) {
  if (n < 2) {
    return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}

/* GET home page. */
router.get("/", async (req, res, next) => {
  try {
    // commented for newer version
    // await client.connect({ useNewUrlParser: true });
    const requestContext = context.active();
    const database = client.db("voting");
    const votes = database.collection("votes");

    if (req.query.choice === "clear") {
      // This will delete all documents in the votes collection
      await votes.deleteMany({});
    } else if (req.query.choice) {
      // Insert a new document with the choice
      await votes.insertOne({ choice: req.query.choice });
    }

    const spaces = await votes.countDocuments({ choice: "spaces" });
    const tabs = await votes.countDocuments({ choice: "tabs" });

    // add the tracer

    // if (Math.random() < 0.5) {
    const tracer = trace.getTracer(pkg.name, pkg.version);
    tracer.startActiveSpan("fibonacci_trace", {}, requestContext, (span) => {
      try {
        console.log("in tracer");
        fibonacci(20);
      } catch (err) {
        span.recordException(err);
        span.setStatus({ code: 2 }); // Set error status if it blows up
      } finally {
        span.end();
      }
    });
    // }

    return res.json({
      spaces,
      tabs
    });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
