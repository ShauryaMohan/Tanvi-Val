

let data = [{
    title: "Tanvi's Birthday",
    date: toISTMidnight(new Date("2001-02-21")),
    gif: "https://media.tenor.com/4jkDInaUtxEAAAAj/mimibubu.gif"
  }, {
     title: "Our Anniversary",
      date: toISTMidnight(new Date("2022-06-16")),
      gif: "https://media1.tenor.com/m/bsSOg1KPHS0AAAAC/dudu-bubu-new-dudu.gif"
  }, {
    title: "Shaurya's Birthday",
    date: toISTMidnight(new Date("2000-12-04")),
    gif: "https://media.tenor.com/63IENW605s0AAAAj/dudu-twisting-dance.gif"
  }];


  let container = document.getElementsByClassName('container')[0];
  
 function CreateSquare(dataElement){
    let square = document.createElement('div');
    square.classList.add('square');
    let squareHeader = document.createElement('div');
    squareHeader.classList.add('square-header');
    let squareHeaderText = document.createElement('div');
    squareHeaderText.classList.add('square-header-text');
    squareHeaderText.innerHTML = dataElement.title;
    squareHeader.appendChild(squareHeaderText);
    square.appendChild(squareHeader);
    let squareBody = document.createElement('div');
    squareBody.classList.add('square-body');
    let img = document.createElement('img');
    img.src = dataElement.gif;
    img.alt = dataElement.title;
    squareBody.appendChild(img);
    square.appendChild(squareBody);
    let squareFooter = document.createElement('div');
    squareFooter.classList.add('square-footer');
    squareFooter.innerHTML = getTimeToNextEvent(dataElement.date);
    square.appendChild(squareFooter);

    setInterval(() => {
      squareFooter.innerHTML = getTimeToNextEvent(dataElement.date);
  }, 1000);

    return square;
  }

  function getTimeToNextEvent(date) {
    // Convert input date to IST
    const istDate = toIST(date);

    let year = new Date().getFullYear();
    istDate.setFullYear(year); // Update date to current year

    if (istDate < toIST(new Date())) {
        istDate.setFullYear(year + 1);
    }

    let diff = istDate - toIST(new Date());
    let days = Math.floor(diff / (1000 * 60 * 60 * 24));
    let hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
    let minutes = Math.floor(diff / (1000 * 60)) % 60;
    let seconds = Math.floor(diff / 1000) % 60;

    return `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
  }

  function toIST(date) {
    const offsetIST = 5.5 * 60; // IST offset in minutes (5 hours 30 minutes)
    return new Date(date.getTime() + offsetIST * 60000);
  }

  function toISTMidnight(date) {
    const istDate = toIST(date);
    istDate.setHours(0, 0, 0, 0); // Set to midnight IST
    return istDate;
}

  data.forEach((dataElement) => {
    container.appendChild(CreateSquare(dataElement));
  });
