const fs = require("fs");
const path = require("path");

const disorderedDir = path.join(__dirname, "Output", "Disordered Files");
const organizedDir = path.join(__dirname, "Output", "Organized Files");

const categories = {
  images: ["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp"],
  documents: ["pdf", "doc", "docx", "txt", "md", "rtf"],
  videos: ["mp4", "mkv", "avi", "mov", "flv", "wmv"],
  audio: ["mp3", "wav", "aac", "flac", "ogg"],
  code: ["js", "ts", "jsx", "tsx", "html", "css", "py", "java", "c", "cpp"],
  archives: ["zip", "rar", "7z", "tar", "gz"],
  spreadsheets: ["xls", "xlsx", "csv"],
  presentations: ["ppt", "pptx"],
  fonts: ["ttf", "otf", "woff", "woff2"],
  executables: ["exe", "sh", "bat"],
  databases: ["sql", "db", "sqlite"],
  others: [], // For unknown extensions
};

const testFiles = [
  "photo1.jpg",
  "resume.pdf",
  "video_clip.mp4",
  "song.aac",
  "script.js",
  "archive.zip",
  "data.csv",
  "presentation.pptx",
  "logo.svg",
  "notes.txt",
  "backup.tar",
  "holiday.png",
  "music.flac",
  "program.cpp",
  "spreadsheet.xlsx",
  "document.docx",
  "animation.gif",
  "movie.mkv",
  "audio_sample.wav",
  "design.psd", // does NOT match any category
  "webpage.html",
  "config.json",
  "package.gz",
  "installer.exe",
  "vector.ai", // unknown category
  "font.woff2",
  "database.db",
  "script.py",
  "tutorial.mov",
  "compressed.7z",
  "style.css",
  "report.md",
  "archive.rar",
  "wallpaper.webp",
  "video2.avi",
  "unknown.xyz", // completely unknown
  "shell.sh",
];

function initializeFiles() {
  if (!fs.existsSync(disorderedDir)) {
    fs.mkdirSync(disorderedDir, { recursive: true });
    console.log("Disordered directory is created");

    testFiles.forEach((file) => {
      fs.writeFileSync(path.join(disorderedDir, file), `Content of ${file}`);
    });
  }
  console.log("Disordered files are created");

  if (!fs.existsSync(organizedDir)) {
    fs.mkdirSync(organizedDir, { recursive: true });
  }
  console.log("Organized directory is created");

  Object.keys(categories).forEach((category) => {
    const categoryName = category.replace(/\s+/g, "-").toLowerCase();
    const categoryPath = path.join(organizedDir, categoryName);
    if (!fs.existsSync(categoryPath)) {
      fs.mkdirSync(categoryPath);
    }
  });
  console.log("Different category directories are created");
  console.log("-".repeat(50));
}

function getCategory(filename) {
  const ext = path.extname(filename).toLowerCase().replace(".", "");
  for (const [category, extensions] of Object.entries(categories)) {
    if (extensions.includes(ext)) {
      return category;
    }
  }
  return "others";
}

function organizeFiles() {
  console.log("File Organizer\n");
  console.log("Source:", disorderedDir);
  console.log("Destination:", organizedDir);
  console.log("-".repeat(50));

  const files = fs.readdirSync(disorderedDir);

  if (files.length === 0) {
    console.log("No Files to work on!");
    return;
  }
  console.log(`Found ${files.length} files to organize`);

  const stats = {
    total: 0,
    byCategory: {},
  };

  files.forEach((file) => {
    const sourcePath = path.join(disorderedDir, file);
    const stat = fs.statSync(sourcePath);
    if (stat.isDirectory()) {
      return;
    }
    const category = getCategory(file);
    const destDir = path.join(organizedDir, category);
    const destPath = path.join(destDir, file);

    fs.renameSync(sourcePath, destPath);

    stats.total++;
    stats.byCategory[category] = (stats.byCategory[category] || 0) + 1;
    console.log(`File: ${file}`);
    console.log(`Category: ${category}`);
    console.log(`Size: ${stat.size} bytes`);
    console.log("-".repeat(30));
  });
}

function showHelp() {
  console.log(`
    File Organizer - Usage: 

    Commands: 
    init - create files
    organize - organize files into categories
    
    Example: 
    node file-organizer.js init
    node file-organizer.js organize
        `);
}

const command = process.argv[2];
switch (command) {
  case "init":
    initializeFiles();
    break;
  case "organize":
    organizeFiles();
    break;
  default:
    showHelp();
    break;
}
