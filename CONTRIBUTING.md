# Contributing to D2-Guardian-Forge

Thank you for your interest in contributing to D2-Guardian-Forge! 

## How to Contribute

### Reporting Bugs

- Use the GitHub Issues page
- Include clear title and description
- Provide steps to reproduce
- Include browser/OS information
- Add screenshots if applicable

### Suggesting Features

- Use GitHub Issues with "enhancement" label
- Explain the use case
- Describe desired behavior
- Consider implementation details

### Code Contributions

1. **Fork the Repository**
   ```bash
   git clone https://github.com/YOUR-USERNAME/D2-Guardian-Forge.git
   cd D2-Guardian-Forge
   ```

2. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Make Changes**
   - Follow existing code style
   - Use TypeScript strict mode
   - Keep components focused
   - Add types for all new data

5. **Test Your Changes**
   ```bash
   npm run dev      # Test locally
   npm run build    # Test production build
   npm run lint     # Check for issues
   ```

6. **Commit and Push**
   ```bash
   git add .
   git commit -m "feat: your feature description"
   git push origin feature/your-feature-name
   ```

7. **Create Pull Request**
   - Provide clear description
   - Link related issues
   - Include screenshots if UI changes

### Development Guidelines

#### Code Style
- Use TypeScript for all new code
- Follow existing naming conventions
- Use functional components with hooks
- Keep functions small and focused
- Add comments for complex logic

#### File Organization
- Components in `/src/components`
- Pages in `/src/pages`
- Types in `/src/types`
- Data in `/src/data`
- Utilities in `/src/utils`
- Hooks in `/src/hooks`

#### Data Files
- Use JSON for game data
- Follow existing schema
- Validate against TypeScript types
- Keep data organized by category

#### Commit Messages
Use conventional commits:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Formatting
- `refactor:` Code restructuring
- `test:` Tests
- `chore:` Maintenance

### Adding Game Data

#### New Supers/Abilities
1. Add to appropriate JSON file in `/src/data`
2. Follow existing schema
3. Include all required fields
4. Test in build planner

#### New Build Templates
1. Create JSON file in `/builds`
2. Follow build schema from `/src/types`
3. Include strengths, weaknesses, gameplay loop
4. Update builds README

### Testing

- Test on multiple browsers
- Test responsive design
- Test build save/load
- Test filtering and search
- Verify data integrity

### Questions?

Open an issue or start a discussion!

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn
- Give credit where due

Thank you for contributing! 🎮
