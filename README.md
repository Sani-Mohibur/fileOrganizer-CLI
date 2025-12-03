# 📂 File Organizer CLI

A simple Node.js CLI tool that automatically organizes files into categorized folders based on their extensions. Includes a built-in test mode to generate dummy files and demonstrate the organizer in action.

## 🚀 Features

* **📦Automated Organization:** Instantly moves files into folders like `images`, `documents`, `code`, etc.  
* **🧪Test Environment:** Includes an `init` command to generate dummy files for testing.  
* **🛡️Safe Handling:** Moves unknown file types to an `others` folder.  

## 📋 Categories Supported

The script handles various file types including:
* **Images:** jpg, png, svg, etc.
* **Documents:** pdf, docx, txt, etc.
* **Code:** js, py, html, etc.
* **Archives:** zip, rar, etc.
* **Media:** mp4, mp3, wav, etc.

## 🛠️ Usage

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Sani-Mohibur/fileOrganizer-CLI.git
    ```

2.  **Initialize the environment (Create dummy files):**
    ```bash
    node index.js init
    ```
    *This creates an `Output/Disordered Files` folder with sample data.*

3.  **Organize the files:**
    ```bash
    node index.js organize
    ```
    *This sorts everything into `Output/Organized Files`.*

## 🤝 Contributing

Want to improve it?  
Feel free to **fork** this project and submit a pull request if you want to add more features!
