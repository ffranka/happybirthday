const textElement = document.getElementById('text');
const optionButtonsElement = document.getElementById('option-buttons');

let state = {};

function startGame() {
  state = {};
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild);
  }
  showTextNode(1);
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
  textElement.innerHTML = ''; // Clear existing content
  const textLines = textNode.text.split('\n'); // Split text into lines
  // Create a container for text and caret
  const container = document.createElement('div');
  container.classList.add('text-container');
  textElement.appendChild(container);
  // Add each line of text with typing effect
  textLines.forEach((line, index) => {
    const lineElement = document.createElement('p');
    container.appendChild(lineElement);
    let charIndex = 0;
    const typeLine = () => {
      if (charIndex < line.length) {
        lineElement.textContent += line.charAt(charIndex);
        charIndex++;
        setTimeout(typeLine, 50); // Adjust typing speed here
      } else if (index < textLines.length - 1) {
        lineElement.textContent += '\n'; // Add line break
        typeLine(); // Type next line
      } else {
        // Text typing completed, show options
        showOptions(textNode.options);
      }
    };
    typeLine(); // Start typing for each line
  });
}

function showOptions(options) {
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild);
  }

  options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button');
      button.innerText = option.text;
      button.classList.add('btn');
      button.addEventListener('click', () => selectOption(option));
      optionButtonsElement.appendChild(button);
    }
  });
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
  const nextTextNodeId = option.nextText;
  if (nextTextNodeId <= 0) {
    return startGame();
  }
  state = Object.assign(state, option.setState);

  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild);
  }

  showTextNode(nextTextNodeId);
}

const textNodes = [
  {
    id: 1,
    text: '...Ah, Hallo. Du musst Lara sein.',
    options: [
      {
        text: '> Hallo!',
        nextText: 2
      },
      {
        text: '> Ähh...',
        nextText: 12
      }
    ]
  },
  {
    id: 2,
    text: 'Sehr gut. Wie du weißt ist heute ein besonderer Tag.',
    options: [
      {
        text: '> Mein Geburtstag!',
        nextText: 3
      },
      {
        text: '> Jeder Tag mit Franka ist besonders.',
        nextText: 3
      },
    ]
  },
  {
    id: 3,
    text: 'Hm, was? Ah, eigentlich meinte ich, dass heute Freitag ist.',
    options: [
      {
        text: '> Oh...',
        nextText: 4
      },
      {
        text: '> Die Zerstückelung der Zeit in Arbeits- und Ruhetage ist eine Erfindung des Kapitalismus.',
        nextText: 4
      }
    ]
  },
  {
    id: 4,
    text: '...Wie auch immer. Feste soll man feiern. Ich möchte dir etwas schenken.',
    options: [
      {
        text: '> Geile!',
        nextText: 5
      },
      {
        text: '> Her damit!',
        nextText: 5
      },
    ]
  },
  {
    id: 5,
    text: 'Nicht so schnell. Du musst es dir schon verdienen.',
    options: [
      {
        text: '> Klar, los gehts!',
        nextText: 6
      },
      {
        text: '> Wow, bist du ein Arbeitgeber?',
        nextText: 13
      }
    ]
  },
  {
    id: 6,
    text: 'Beantworte mir folgende Frage...: Was läuft am Morgen auf vier Füßen, am Mittag auf zwei und am Abend auf drei?',
    options: [
      {
        text: '> Der Mensch.',
        nextText: 14
      },
      {
        text: '> Keine Ahnung?',
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: 'Hmm, ich ehrlich gesagt auch nicht.',
    options: [
      {
        text: '> ...',
        nextText: 8
      },
    ]
  },
  {
    id: 8,
    text: 'Übrigens, schönes Outfit hast du heute an.',
    options: [
      {
        text: '> Danke!',
        nextText: 9
      },
      {
        text: '> Ich weiß.',
        nextText: 9
      }
    ]
  },
  {
    id: 9,
    text: 'Das ist ja auch irgendwie ein Verdienst.',
    options: [
      {
        text: '> Sicherlich.',
        nextText: 10
      }
    ]
  },
  {
    id: 10,
    text: 'Na gut, hier ist dein Geschenk...',
    options: [
      {
        text: '> Wo?',
        nextText: 15,
      }
    ]
  },
  {
    id: 12,
    text: 'Oh, doch nicht? Dann bist du hier falsch.',
    options: [
      {
        text: 'Warte, sags nochmal!',
        nextText: -1
      }
    ]
  },
  {
    id: 13,
    text: 'Frech. Dafür musst du ne Extrarunde drehen.',
    options: [
      {
        text: '> Na toll.',
        nextText: -1
      }
    ]
  },
  {
    id: 14,
    text: 'Hm, was? Wann hast du das letzte mal einen Menschen mit vier Füßen gesehen? Was für ne bescheuerte Antwort.',
    options: [
      {
        text: '> Muss ich jetzt nochmal von vorne anfangen?',
        nextText: -1
      }
    ]
  },
  {
    id: 15,
    text: 'Ok Lara, also es ist so, ich kriegs echt nicht hin hier ein Bild einzufügen also geb ich es dir einfach persönlich...',
    options: [
      {
        text: '> Kein Ding, du hast das super gemacht, Franka!',
        nextText: 16
      }
    ]
  },
  {
    id: 16,
    text: 'Danke Larry, das ist lieb von dir.',
    options: [
      {
        text: '> :-)',
        nextText: -1
      }
    ]
  },
  
]


startGame();
