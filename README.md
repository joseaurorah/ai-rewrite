# Rewrite Rocket - A text manipulation tool 📝

This project is a *Next.js-based web application* that leverages the Gemini API to provide users with powerful text translation and paraphrasing capabilities. The tool allows users to input text, select their desired language and tone, and receive the translated or rewritten text in real-time

**[Live Demo](https://rewriterocket.vercel.app/)**

## 💻 Features

**🛬 Translation**

Translate text into multiple supported languages.

**📖 Paraphrasing**

Users can input any text they'd like to translate or paraphrase.

- standard
- natural
- formal
- informal
- funny

**⚙️ Customization**

- Select from a predefined list of languages.
- Choose the desired tone for rewriting

## 🚀 How It Works

1: **Input Text**

The user enters the text they want to translate or rewrite.

2: **Select Options**

- Choose a language from the available options.
- Select a tone for paraphrasing

3: **Submit**

The text is sent to the Gemini API via a backend endpoint.

4: **View Results**

The translated or rewritten text is displayed in real-time.

## 📊 Technologies Used

**Frontend**

- Next.js (React Framework)
- TypeScript for type-safe development
- Tailwind/ShadCN for styling

**Backend**

Gemini API integration for translation and paraphrasing

## 🎈 Getting Started

**Prerequisites**

- Node.js installed (>=16.0.0 recommended)
- A valid Gemini API key

After cloning the project, install dependencies

```bash
npm install
```

Create an .env file inside the root of the project

```bash
NEXT_PUBLIC_GEMINI_API_KEY=<Your Gemini API Key>
```

Run the development server:

```bash
npm run dev
```

## 📈 Future Improvements

- Add support for more languages and tones.
- Enhance UI/UX with animations and visual cues.
- Integrate text-to-speech functionality.
- Enable batch processing for multiple text inputs.

## 📜 License

This project is licensed under the [MIT](https://opensource.org/license/mit) License.

## ❤ Acknowledgments

- Next.js for the framework.
- Gemini API for text translation and paraphrasing services.
- Vercel for seamless deployment.

Enjoy using the tool and happy paraphrasing. 😊
