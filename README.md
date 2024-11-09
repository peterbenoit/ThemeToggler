# ThemeToggle Library

## Overview

ThemeToggle is a lightweight JavaScript library that allows you to easily switch between light and dark themes on a webpage. The library automatically applies the appropriate theme based on the user's system preferences or time of day, and provides a customizable toggle button for manual switching.

### Features
- Automatically adjusts theme based on system settings or time of day.
- Configurable light and dark themes with custom CSS variables.
- Supports a customizable toggle button.
- Listens to system preference changes and adapts theme accordingly.

## Installation

To use the ThemeToggle library, simply include the script in your HTML file.

```html
<script src="path/to/themetoggle.js"></script>
```

Or, you can add it directly in your `<head>` or `<body>` tags.

## Usage

### Basic Initialization
To initialize the ThemeToggle library, call the `init()` method.

```javascript
ThemeToggle.init();
```

This will add a theme toggle button to the default location on your webpage (`#theme-toggle` by default) and use the default theme configuration.

### Custom Configuration
You can customize the ThemeToggle button's location, theme colors, and behavior by passing a configuration object to the `init()` method.

```javascript
ThemeToggle.init({
    targetId: 'your-div-id',
    useSystemTime: false,
    lightTheme: {
        '--background-color': '#fafafa',
        '--text-color': '#222222',
        '--primary-color': '#ff6347'
    },
    darkTheme: {
        '--background-color': '#1a1a1a',
        '--text-color': '#e0e0e0',
        '--primary-color': '#4b0082'
    },
    themeButton: {
        '--button-position': 'fixed',
        '--button-top': '20px',
        '--button-right': '20px',
        '--icon-size': '20px'
    }
});
```

### Example
Add a `div` with an `id` of `theme-toggle` to your HTML:

```html
<div id="theme-toggle"></div>
```

Then, initialize ThemeToggle in your JavaScript:

```javascript
ThemeToggle.init();
```

## Configuration Options

- **targetId**: The ID of the HTML element where the theme toggle button should be inserted.
- **useSystemTime**: Boolean to determine if the theme should automatically change based on the time of day (night/day).
- **lightTheme** & **darkTheme**: Objects defining CSS variables for light and dark themes respectively.
- **themeButton**: CSS variables that define the position and size of the toggle button.

## Methods

### `init(config)`
Initializes the ThemeToggle library. Accepts an optional configuration object to customize the library's behavior and appearance.

### `toggleTheme()`
Manually toggles between light and dark themes.

### `applyTheme(theme)`
Applies the specified theme (`light` or `dark`).

## Example
Here's an example of initializing ThemeToggle with full configuration:

```javascript
ThemeToggle.init({
    targetId: 'theme-toggle',
    useSystemTime: true,
    lightTheme: {
        '--background-color': '#ffffff',
        '--text-color': '#000000'
    },
    darkTheme: {
        '--background-color': '#000000',
        '--text-color': '#ffffff'
    },
    themeButton: {
        '--button-position': 'fixed',
        '--button-top': '10px',
        '--button-right': '10px',
        '--icon-size': '24px'
    }
});
```

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! If you find any issues or want to improve the library, feel free to open a pull request or an issue on GitHub.

## Contact

If you have any questions or feedback, please open an issue.

