# SkillShare - Collaborative Learning Platform

Welcome 👋 to the official repository of the **SkillShare Landing Page** 🎓, a digital platform for collaborative learning and academic networking. This project was developed using HTML, CSS, and JavaScript, following web development best practices and version control standards.

## 📌 Project Description

The SkillShare Landing Page aims to provide an attractive, clear, and informative presentation about the services offered by the **SkillShare platform**. It's designed to offer users smooth navigation, accessibility across different devices, and key interactive functionalities.

> ⭐ **SkillShare** is a web application designed to revolutionize the way students learn and collaborate.  
> Through an **intuitive and accessible platform**, it offers a **comprehensive set of tools** that allow users to form study groups, share resources, and enhance their academic performance in a **simple and efficient way**.  
>   
> With the goal of **promoting collaborative learning** and creating a **community of passionate learners**, SkillShare facilitates connections between students and the academic world in a **modern digital environment**.

## ⚙️ Technologies Used

- **HTML5**: For content structure and proper web semantics.
- **CSS3**: For responsive design and visual element styling.
- **JavaScript (ES6+)**: For interactive functionalities and user experience enhancement.
- **Git & GitHub**: For project version control.
- **GitHub Pages**: For free landing page deployment.
- **Figma**: For visual prototyping of landing page sections.

## 🚀 Project Deployment

The landing page is publicly deployed using **GitHub Pages**.

🔗 [Click here to view it live]()


## 📁 Repository Structure

```
skillshare-landing/
│
├── index.html             # Main website page.
├── LICENSE.md             # Project license.
├── README.md              # Project documentation.
│
├── assets/                # Static site resources.
│   ├── i18n/              # Translation files.
│   │   ├── en.json        # English translations.
│   │   └── es.json        # Spanish translations.
│   ├── fonts/             # Custom fonts.
│   ├── images/            # Images used on the site.
│   │   ├── section/       # Section-specific images.
│   │   │   ├── hero/          # Hero section images.
│   │   │   ├── how-it-works/  # How it works section.
│   │   │   ├── features/      # Features section.
│   │   │   ├── pricing/       # Pricing section.
│   │   │   └── testimonials/  # Testimonials section.
│   │   └── logos/         # Logo variations.
│   ├── scripts/           # JavaScript files.
│   │   ├── index.js           # Main functionality.
│   │   └── languageManager.js # Language management.
│   └── styles/            # CSS style sheets.
│       ├── components/        # Component-specific styles.
│       │   ├── fonts.css      # Font definitions.
│       │   ├── variables.css  # Global CSS variables.
│       │   └── components/    # Individual components.
│       └── main.css           # General styles.
│
└── sections/              # Reusable HTML sections.
```

## 🔁 Version Control - Workflow

This project uses the **GitFlow** model for efficient code management:

| Branch | Description |
|------|-------------|
| `main` | Contains production-ready code |
| `develop` | Branch for integrating new features before production |
| `feature/*` | Branches for new functionalities |
| `release/*` | Preparation of stable versions |
| `hotfix/*` | Urgent production fixes |

### 📌 Branch Naming Conventions

- Feature: `feature/descriptive-name`
- Release: `release/x.y.z`
- Hotfix: `hotfix/descriptive-name`

## 🧩 Semantic Versioning

Follows **Semantic Versioning 2.0.0** in the format `MAJOR.MINOR.PATCH`.  
Examples:
- `v1.0.0` - First stable version.
- `v1.1.0` - New feature added.
- `v1.1.1` - Minor bug fixes.

## ✍️ Commit Conventions

Adopts the **Conventional Commits** standard for clear history:

| Type | Example |
|------|---------|
| `feat` | `feat: add language selector functionality` |
| `fix` | `fix: resolve contact form validation issue` |
| `docs` | `docs: update README with new features` |
| `style` | `style: improve responsive design for mobile` |
| `refactor` | `refactor: optimize features carousel performance` |
| `test` | `test: add unit tests for language manager` |

## 🎨 Code Style Guide

### General Principles

- Code in English
- 2-space indentation
- DRY principle (Don't Repeat Yourself)

### HTML
- Clear semantics and structure
- Use of tags like `<header>`, `<section>`, `<main>`, etc.
- Double quotes for attributes
- Elements and attributes in lowercase

### CSS
- Organization by logical blocks: layout, box-model, typography, color, visual
- BEM nomenclature (`.feature-card__title`, `.feature-card--active`)
- Avoid nesting beyond 3 levels

### JavaScript
- `camelCase` for variables and functions
- `PascalCase` for classes
- `UPPER_SNAKE_CASE` for constants
- Default use of `const`
- Arrow functions, ES6+, destructuring, etc.

## 🧪 Best Practices

- Clean and modular code
- Comments only when necessary
- Use of official web resources such as:
  - [Google HTML/CSS Style Guide](https://google.github.io/styleguide/htmlcssguide.html)
  - [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
  - [Conventional Commits](https://www.conventionalcommits.org/)

## 👨‍💻 Contribution

If you wish to contribute to this project:

1. Create a fork
2. Create a branch `feature/new-feature`
3. Make your changes
4. Open a Pull Request to `develop`

## 🧾 License

This project is under the **MIT** license. You can see more details in the [LICENSE](LICENSE.md) file.

## 🛠️ Team
1. [Jhosep Argomedo](https://github.com/JhosepAC)
2. [Sebastian Ramirez](https://github.com/SRT0808)
3. [Renso Julca](https://github.com/rajc02)
4. [Carlos Gonzalez ](https://github.com/CarlosGC-LP)

## 📬 Contact

Questions, suggestions, or comments?  
Feel free to write to us at: **support@skillshare.com**

---