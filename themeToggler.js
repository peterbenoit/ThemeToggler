/*
 * ThemeToggler
 * A JavaScript library to toggle between light and dark themes for a webpage.
 * It provides the ability to automatically use the system color preference, apply light/dark modes,
 * and renders a toggle button for users to manually switch between themes.
 */
(function () {
	if (window.ThemeToggler && window.ThemeToggler.initialized) {
		console.warn('ThemeToggler is already initialized.');
		return;
	}

	const ThemeToggler = {
		initialized: false,
		/**
		 * Initializes the ThemeToggler library.
		 * @param {Object} config - Configuration object to customize themes and button behavior.
		 */
		init: function (config) {
			/**
			 * Default configuration for the ThemeToggler library.
			 * `targetId` - ID of the element where the toggle button will be placed.
			 * `lightTheme` and `darkTheme` - Objects defining CSS variables for light and dark themes.
			 * `themeButton` - CSS variables to customize the position and size of the toggle button.
			 */
			const defaultConfig = {
				targetId: 'theme-toggle',
				lightTheme: {
					'--background-color': '#ffffff',
					'--text-color': '#333333',
					'--primary-color': '#2563eb',
					'--secondary-color': '#e5e7eb',
					'--tertiary-color': '#f3f4f6',
					'--sun-color': '#ffa500',
					'--moon-color': '#1a1a1a'
				},
				darkTheme: {
					'--background-color': '#1a1a1a',
					'--text-color': '#ffffff',
					'--primary-color': '#3b82f6',
					'--secondary-color': '#374151',
					'--tertiary-color': '#262626',
					'--sun-color': '#ffcc00',
					'--moon-color': '#ffffff'
				},
				themeButton: {
					'--button-position': 'fixed',
					'--button-top': '10px',
					'--button-right': '20px',
					'--button-bottom': 'auto',
					'--button-left': 'auto',
					'--icon-size': '24px',
					'--icon-rotation': '180deg'
				}
			};

			this.config = {
				lightTheme: {
					...defaultConfig.lightTheme,
					...(config?.lightTheme || {})
				},
				darkTheme: { ...defaultConfig.darkTheme, ...(config?.darkTheme || {}) },
				themeButton: {
					...defaultConfig.themeButton,
					...(config?.themeButton || {})
				},
				targetId: config?.targetId || defaultConfig.targetId
			};

			// Apply the correct theme based on current preferences
			this.applyTheme(this.getTheme());
			// Render the theme toggle button on the page
			this.renderToggle();
			// Inject required CSS into the document
			this.injectCSS();

			// Listen for changes in system color scheme preference and apply appropriate theme
			window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
				if (!localStorage.getItem('theme')) {
					const newTheme = event.matches ? 'dark' : 'light';
					this.applyTheme(newTheme);
				}
			});
		},

		/**
		 * Retrieves the current theme.
		 * @returns {string} The current theme ('light' or 'dark').
		 */
		getTheme: function () {
			const storedTheme = localStorage.getItem('theme');
			const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

			// Return stored theme if it's set
			if (storedTheme) {
				return storedTheme;
			}

			// Use system preference if there's no stored theme
			if (prefersDark) {
				return 'dark';
			}

			// Default to light theme
			return 'light';
		},

		/**
		 * Applies the specified theme.
		 * @param {string} theme - The theme to be applied ('light' or 'dark').
		 */
		applyTheme: function (theme) {
			const themeVariables =
				theme === 'light' ? this.config.lightTheme : this.config.darkTheme;
			for (let [key, value] of Object.entries(themeVariables)) {
				document.documentElement.style.setProperty(key, value);
			}
			for (let [key, value] of Object.entries(this.config.themeButton)) {
				document.documentElement.style.setProperty(key, value);
			}
			document.documentElement.setAttribute('data-theme', theme);
			localStorage.setItem('theme', theme);
		},

		/**
		 * Toggles between the light and dark themes.
		 */
		toggleTheme: function () {
			const current = this.getTheme();
			const next = current === 'light' ? 'dark' : 'light';
			this.applyTheme(next);
		},

		/**
		 * Renders the theme toggle button in the target container.
		 */
		renderToggle: function () {
			const target = document.getElementById(this.config.targetId);
			if (!target) {
				console.error('ThemeToggler: Target element not found');
				return;
			}

			const btn = target.querySelector('.theme-toggle');
			if (!btn) {
				// Create the toggle button element
				const button = document.createElement('button');
				button.className = 'theme-toggle';
				button.setAttribute('onclick', 'ThemeToggler.toggleTheme()');
				button.setAttribute('aria-label', 'Toggle theme');
				button.innerHTML = `
					<svg xmlns="http://www.w3.org/2000/svg" class="sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
						<circle cx="12" cy="12" r="5"></circle>
						<line x1="12" y1="1" x2="12" y2="3"></line>
						<line x1="12" y1="21" x2="12" y2="23"></line>
						<line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
						<line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
						<line x1="1" y1="12" x2="3" y2="12"></line>
						<line x1="21" y1="12" x2="23" y2="12"></line>
						<line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
						<line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
					</svg>
					<svg xmlns="http://www.w3.org/2000/svg" class="moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
						<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
					</svg>
				`;
				target.appendChild(button);
			}
		},

		/**
		 * Injects CSS for theme styles and the toggle button into the document.
		 */
		injectCSS: function () {
			const style = document.createElement('style');
			style.innerHTML = `
                body {
                    transition: background-color 0.3s ease, color 0.3s ease;
                    background-color: var(--background-color);
                    color: var(--text-color);
                }

                .theme-toggle {
                    position: var(--button-position);
                    top: var(--button-top);
                    right: var(--button-right);
                    bottom: var(--button-bottom);
                    left: var(--button-left);
                    background: none;
                    border: none;
                    padding: 8px;
                    cursor: pointer;
                    border-radius: 5px;
                    transition: background-color 0.3s ease;
                }

                .theme-toggle:hover {
                    background-color: rgba(0, 0, 0, 0.024);
                }

                .theme-toggle svg {
                    width: var(--icon-size);
                    height: var(--icon-size);
                    stroke-width: 2;
                    transition: transform 0.5s ease;
                }

                .sun-icon {
                    stroke: var(--sun-color);
                }

                .moon-icon {
                    stroke: var(--moon-color);
                }

                [data-theme="light"] .sun-icon {
                    transform: rotate(var(--icon-rotation));
                    opacity: 0;
                    position: absolute;
                }

                [data-theme="light"] .moon-icon {
                    transform: rotate(0deg);
                    opacity: 1;
                }

                [data-theme="dark"] .sun-icon {
                    transform: rotate(0deg);
                    opacity: 1;
                }

                [data-theme="dark"] .moon-icon {
                    transform: rotate(calc(-1 * var(--icon-rotation)));
                    opacity: 0;
                    position: absolute;
                }

                .sun-icon,
                .moon-icon {
                    transition: all 0.5s ease;
                }
            `;
			document.head.appendChild(style);
		}
	};

	window.ThemeToggler = ThemeToggler;
})();
