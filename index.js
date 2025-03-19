import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

//telling express that our static files are in the public folder
app.use(express.static("public"));

app.get("/", (req, res) => {
  const { type, adv } = getDayInfo();
  res.render("index.ejs", {
    dayType: type,
    advice: adv,
  });
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});

app.post("/submit", (req, res) => {
  const { type, adv } = getDayInfo();
  const numLetters = req.body["fName"].length + req.body["lName"].length;
  console.log(numLetters);
  res.render("index.ejs", {
    numberOfLetters: numLetters,
    dayType: type,
    advice: adv,
  });
});

/* Write your code here:
Step 1: Render the home page "/" index.ejs
Step 2: Make sure that static files are linked to and the CSS shows up.
Step 3: Add the routes to handle the render of the about and contact pages.
  Hint: Check the nav bar in the header.ejs to see the button hrefs
Step 4: Add the partials to the about and contact pages to show the header and footer on those pages. */

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

function getDayInfo() {
  const today = new Date();
  const day = today.getDay();

  let type;
  let adv;
  // let type = "a weekday";
  // let adv = "it's time to work!";

  switch (day) {
    case 0:
      type = "Sunday";
      adv = "it's time to relax!";
      break;
    case 1:
      type = "Monday";
      adv = "it's time to start the week!";
      break;
    case 2:
      type = "Tuesday";
      adv = "keep going!";
      break;
    case 3:
      type = "Wednesday";
      adv = "halfway through the week!";
      break;
    case 4:
      type = "Thursday";
      adv = "almost there!";
      break;
    case 5:
      type = "Friday";
      adv = "the weekend is near!";
      break;
    case 6:
      type = "Saturday";
      adv = "enjoy your weekend!";
      break;
    default:
      type = "a weekday";
      adv = "it's time to work!";
  }

  // if (day === 0 || day === 6) {
  //   type = "the weekend";
  //   adv = "it's time to have some fun!";
  // }
  return { type, adv };
}

