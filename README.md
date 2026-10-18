# Dwadasha Jyotirlinga: The Twelve Pillars of Light

A fast, static, bilingual-free (English) website about the twelve Jyotirlingas of Lord Shiva. No build step, no dependencies.

## Features
- Interactive sky-map: all 12 shrines plotted from real latitude and longitude
- Detail panel per shrine: overview, legend, history, shloka with meaning, scriptural references, visiting tips
- Search, state filter, and stotram-order sorting
- Dwadasha Jyotirlinga Stotram and the Mahamrityunjaya mantra
- Scripture guide (Shiva Purana, Linga Purana, Skanda Purana and more)
- Deep links (`index.html#kedarnath`), keyboard navigation (Esc, left/right arrows)
- Light and dark mode, reduced-motion support, responsive layout

## Run locally
Open `index.html` in a browser, or run `python3 -m http.server`.

## Deploy on GitHub Pages
Push the files to a repo, then Settings > Pages > Deploy from branch > `main` / root.

## Structure
```
index.html   page structure
style.css    design system
script.js    map, search, modal logic
data.js      all content (edit here to add or fix facts)
```

## Contributing
All content lives in `data.js`. Add facts with a cited source in your pull request. Some site locations (Vaidyanath, Nageshwar, Bhimashankar) are traditionally disputed; keep notes neutral.

## Disclaimer
Content is compiled from traditional sources. Verify dates, timings and rules with official temple trusts before travelling.

## License
MIT
