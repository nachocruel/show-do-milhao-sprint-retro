import { Configuration, OpenAIApi } from "openai";
import { Card } from "./domain/cards/Card";
import { Server } from './server'
const server = Server.GetInstance();

const cards = [];
const kudocard = new Card("/partiner.png", "Kudo Card");
cards.push(kudocard);

const positiveCard = new Card("/positive.png", "O que houve de positivo?")
cards.push(positiveCard);

const improveCard = new Card("/improve.png", "O que melhorar?")
cards.push(improveCard);

const culture_pop = [
  'dragon ball z',
  'Cavaleiros do zodiaco',
  'guerra nas estrelas',
  'homem aranha',
  'homem de ferro',
  'batman', 'super man',
  'Indiana Jones',
  "Power Rangers", "Pernalonga",
  "Naruto", "Turma da mônica",
  "One Piece", "Karate Kid",
  "Pica-pau", "Tom e Jerry",
  "O senhor dos anéis",
  "Harry Potter",
  "Matrix", "John Wick",
  "Mortal Kombat", "Street Fighter",
  "Super Mario Bros", "Sonic the Hedgehog", "One Punch-Man",
  "Heman"
]

const school_time = [
  {
    discipline: "historia",
    topics: ["História do Brasíl", "História da França", "História dos Estados Unidos", "História da china", "Historia das Américas", "Incas"]
  },
  {
    discipline: "biologia",
    topics: ["Histologia", "embriologia", "genética", "anatomia", "biologia (celulas)", "ecologia", "zoologia"]
  },
  {
    discipline: "quimica",
    topics: ["Quimica Orgânica", "Quimica Inorgânica", "", "anatomia", "biologia (celulas)", "ecologia", "zoologia"]
  }
]

const frontend = ["CSS", "HTML", "BootStrap framework", "React framework", "React native", "Angular js"]
const backend = ["C# Programing Language", "Java Programing Language", "Python Programing Language", "SQL", "Java Script", "PHP Language",
  "Android OS", "Linux Ubuntu", "Windows Server", "Docker and containers", "Kubernets", "Kotlin"]


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const { category, username, roomname } = req.body;
  if (category.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please informe a valid category",
      }
    });
    return;
  }

  if (username.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please informe username",
      }
    });
    return;
  }

  if (roomname.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please informe roomname",
      }
    });
    return;
  }

  console.log('roomname: ', roomname)
  const room = server.GetRoom(roomname);

  console.log(room)
  let topic = ''
  switch (category) {
    case 'school_time':
      let discipline = school_time[Math.floor(Math.random() * school_time.length)];
      topic = discipline.topics[Math.floor(Math.random() * discipline.topics.length)]
      break
    case 'frontend':
      topic = frontend[Math.floor(Math.random() * frontend.length)]
      break;
    case 'backend':
      topic = backend[Math.floor(Math.random() * backend.length)]
      break;
    case 'culture_pop':
      topic = culture_pop[Math.floor(Math.random() * culture_pop.length)]
      break;
    default:
      res.status(400).json({
        error: {
          message: "Please enter a valid category",
        }
      });
      return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(topic),
      temperature: 1,
      max_tokens: 2048
    });

    const card = cards[Math.floor(Math.random() * cards.length)];
    const data = { result: { question: JSON.parse(completion.data.choices[0].text), card: card, show_card: true } };
    res.status(200).json(data);
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(topic) {
  return `Gere uma pergunta e forneça 5 alternativas como resposta, sendo 4 falsas e uma verdadeira. Informe qual é a alternativa correta. 
  
  ###
  Tópico: Geográfia
  JSON: { "questao": "Qual a capital do Brasil?", "opcoes": {"A": "Brasília", "B": "Buenos Aires", "C": "Salvador", "D": "Rio de janeiro", "E": "São paulo" }, "correta": "A" }
  ###
  Tópico: ${topic}
  JSON:
`;
}
