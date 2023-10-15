//Diagramm

document.addEventListener('DOMContentLoaded', function() {
  Chart.defaults.backgroundColor = false;
  Chart.defaults.borderColor = '#36A2EB';
  Chart.defaults.color = '#000000';
  Chart.defaults.font.family = 'Roboto';

  // Daten für das Diagramm
  const chartData = {
    //1 ist Bitcon, 2 sind Rechnzentren D, 3 ist Neuseeland
    2010: [0.1, 10.5, 41],
    2011: [0.12, 10.7, 40],
    2012: [0.11, 10.9, 40],
    2013: [0.99, 11.2, 39],
    2014: [4.79, 11.5, 40],
    2015: [3.54, 12, 40],
    2016: [5.46, 12.4, 40],
    2017: [14.44, 13.2, 40],
    2018: [45.36, 14, 40],
    2019: [55.9, 14.9, 40],
    2020: [68.67, 16, 39],
    2021: [103.25, 16.9, 39],
    2022: [107.21, 18, 40],
  };

  const labels = ['Bitcoin', 'Deutsche Rechnernetze', 'Neuseeland']
  const extraInfoArray = [, "Beinhaltet: Streaming, Social Media, Cloud und Videotelefonie",];
  const data = {
    datasets: [{
      label: 'Stromverbrauch in TWh pro Jahr',
      data: [0.1, 10.5, 41],
      backgroundColor: [
        'rgba(82, 191, 211, 0.9)',
        'rgba(224, 238, 238, 0.9)',
        'rgba(170, 170, 170, 0.9)',
      ],
      borderColor: 'transparent',
      borderWidth: 1,                 //BorderWidth von den Kuchenstücken und den Labels über dem Chart
    }],
    labels: labels,
  };

  //plugin block
  const legendMargin = {
    id: 'legendMargin',
    beforeInit(chart, legend, options){
      let fitValue = chart.legend.fit;
      chart.legend.fit = function fit(){
        fitValue.bind(chart.legend)();
        return this.height += options.paddingTop;
      }
    },
    defaults: {
      paddingTop: 0                   //default padding
    }
  };

  // Optionen für das Diagramm
  const options = {
    type: 'polarArea',
    plugins: {
      tooltip: {
        callbacks: {
          beforeFooter: function(context) {
            const dataIndex = context[0].dataIndex;
            const extraInfo = extraInfoArray[dataIndex];
            if (extraInfo) {
              if (labels[dataIndex] === 'Deutsche Rechnernetze') {
                return extraInfo;
              } else {
                return labels[dataIndex] + ' ' + extraInfo;
              }
            } else {
              return null;
            }
          }
        },                            //Pop-Up Einstellungen
        padding: 10,                  //Abstand nach außen
        titleColor: '#ffffff',
        titleAlign: 'center',         //Text mittig
        titleFont: {                  //Titel Größe
          size: 18,
          weight: 'bold',
        },
        bodyFont: {                   //Body Größe
          size: 12,
          weight: 'bold',
        },
        borderColor: '#36A2EB',       //BoderColor von dem Pop-Up
        borderWidth: 1,               //von dem Pop-Up
        displayColors: false,         //mit Box ist hier die Farbbox in dem Pop-Up gemeint, soll nicht angezeigt werden
        yAlign: 'bottom',             //Pop Up kleiner Pfeil ist oben oder unten
        backgroundColor: '#000000'    // Hintergrund
      },
      legendMargin: {                 //Set option of custom plugin
        paddingTop: 40,               //override the default value
        paddingBottom:40
      },
      legend: {                       //Labels über dem Chart
        position: 'top',
        labels: {
          maxHeight: 30,
          color: '#ffffff',           //Schriftfarbe weiß
          boxWidth: 40,               //Größe der Kästen/Labels
          border: 30,
          padding: 40,

          font: {
            size: 17,                 //Textgröße der Labels über dem Chart anpassen
          }
        },
      },
    },
    layout: {
      padding: {
        top: 0,                      //Hier kannst du den gewünschten Abstand einstellen
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
    },
    scales: {
      r: {
        max: 110,                             // Setze den maximalen Skalawert
        ticks: {                              //Einstellung für die Zahlen in dem Chart
          beginAtZero: true,
          stepSize: 10,                       // Setze die Schrittgröße der Skala
          z: 3,                               //Reihenfolge (Anzeigen)
          color: '#ffffff',                   //Farbe der Schrift
          backdropColor: 'transparent',       //Keinen Kasten
          font: {
            size: 14                          //Textgröße anpassen
          }
        },
        grid: {
          circular: true,
          drawTicks: true,                    //Aktiviere / Deaktiviere die Rasterlinien
          lineWidth: 1.4,                     //Setze die Linienbreite auf 1, um sie sichtbar zu machen
          color: '#78a2d3',                   //Setze die Linienfarbe auf die gewünschte Farbe
          drawBorder: true,                   //Aktiviere / Deaktiviere die äußere Rasterlinie
          padding: 50,                        //Hier kannst du den gewünschten Abstand einstellen
        },
      },
    },
  };

  // Erstellung des Diagramms
  const ctx = document.getElementById('polarAreaChart').getContext('2d');
  const polarAreaChart = new Chart(ctx, {
    type: 'polarArea',
    data: data,
    options: options,
    plugins: [legendMargin],
  });

  // Schieberegler für Jahreszahlen
  const yearSlider = document.getElementById('yearRange');
  const yearLabel = document.getElementById('year-label');

  yearSlider.addEventListener('input', function() {
    const selectedYear = yearSlider.value;
    yearLabel.textContent = selectedYear;
    polarAreaChart.data.datasets[0].data = chartData[selectedYear];
    polarAreaChart.update();
  });

  // Initialisiere das Jahr-Label mit dem Startwert
  yearLabel.textContent = yearSlider.value;
});




// Der Ausklappbare Text
function toggle(id) {
  var e = document.getElementById(id);
  var link = document.querySelector(`[href="javascript:toggle('${id}')"]`);

  if (e.style.display === "none") {
    e.style.display = "";
    link.textContent = 'Weniger lesen <';
  } else {
    e.style.display = "none";
    link.textContent = 'Mehr lesen >';
  }
};




// JavaScript, um den Abstand von .text2 basierend auf der Bildhöhe einzustellen
window.addEventListener('load', function() {
  const image = document.getElementById('image');
  const textContainer = document.getElementById('textContainer');
  const imageHeight = image.clientHeight; // Höhe des Bildes

  // Abstand für .text2 setzen, der 50% der Bildhöhe entspricht
  textContainer.style.marginTop = imageHeight * 0.15 + 'px';
});




// Zahl wird hochgezählt
document.addEventListener('DOMContentLoaded', function() {
  const targetValue = 107; // Der Zielwert, zu dem hochgezählt werden soll
  const counterElement = document.getElementById('counter');
  let counterValue = 0;

  const interval = setInterval(function() {
    if (counterValue < targetValue) {
      counterValue++;
      counterElement.textContent = counterValue + ' TWH STROM';
    } else {
      clearInterval(interval);
    }
  }, 35);
});
