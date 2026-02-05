# Pratiksha Pandey - Portfolio Website

A modern, responsive portfolio website built with React and Tailwind CSS, featuring smooth animations, dark theme, and optimized performance.

## 🚀 Features

- **Modern Design**: Clean, professional dark theme with gradient backgrounds
- **Responsive**: Fully responsive design that works on all devices
- **Smooth Animations**: Framer Motion animations for enhanced user experience
- **Performance Optimized**: Fast loading with optimized images and code splitting
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **SEO Friendly**: Optimized meta tags and semantic HTML structure

## 🛠️ Technologies Used

- **Frontend**: React 18, Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Font Awesome
- **Build Tool**: Create React App
- **Deployment**: Ready for Vercel, Netlify, or GitHub Pages

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Pratikshapandey1609/portfolio-react.git
   cd portfolio-react
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 📁 Project Structure

```
src/
├── components/
│   ├── About.js          # About section component
│   ├── Contact.js        # Contact form and info
│   ├── Footer.js         # Footer component
│   ├── Hero.js           # Hero section with animations
│   ├── LoadingScreen.js  # Loading animation
│   ├── Navbar.js         # Navigation component
│   ├── Projects.js       # Projects showcase
│   ├── Resume.js         # Resume section with preview
│   └── Skills.js         # Technical skills display
├── App.js                # Main app component
├── index.js              # React entry point
└── index.css             # Global styles and Tailwind imports
```

## 🎨 Customization

### Colors
The color scheme is defined in `tailwind.config.js`:
- **Primary**: Electric Blue (#8b5cf6)
- **Secondary**: Soft Cyan (#a855f7)
- **Background**: Deep Charcoal (#0a0a0b)
- **Cards**: Rich Graphite (#1a1a1b)

### Content
Update the following files to customize content:
- `src/components/Hero.js` - Personal information and intro
- `src/components/About.js` - About section content
- `src/components/Skills.js` - Technical skills and technologies
- `src/components/Projects.js` - Project portfolio
- `src/components/Contact.js` - Contact information

### Images
Replace images in the `public/assets/img/` directory:
- Profile photo: `passport-new.jpg`
- Project images: Update in `Projects.js`
- Technology icons: Update in `Skills.js`

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Netlify
1. Build the project: `npm run build`
2. Drag and drop the `build` folder to Netlify

### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json:
   ```json
   "homepage": "https://yourusername.github.io/portfolio",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```
3. Deploy: `npm run deploy`

## 📱 Performance Features

- **Lazy Loading**: Images and components load on demand
- **Code Splitting**: Automatic code splitting with React
- **Optimized Images**: Compressed and properly sized images
- **Minimal Bundle**: Tree-shaking removes unused code
- **Fast Animations**: Hardware-accelerated CSS animations

## 🔧 Development

### Available Scripts
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

### Adding New Sections
1. Create a new component in `src/components/`
2. Import and add to `src/App.js`
3. Add navigation link in `src/components/Navbar.js`
4. Style with Tailwind CSS classes

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📞 Contact

- **Email**: pratishapandey239@gmail.com
- **LinkedIn**: [Pratiksha Pandey](https://www.linkedin.com/in/pratiksha-pandey-147770276/)
- **GitHub**: [Pratikshapandey1609](https://github.com/Pratikshapandey1609)

---

Built with ❤️ by Pratiksha Pandey