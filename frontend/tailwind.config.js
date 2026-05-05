/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
              "colors": {
                      "on-tertiary-fixed": "#380d00",
                      "on-primary-fixed": "#001550",
                      "surface-tertiary": "#F3FBF6",
                      "primary-fixed": "#dce1ff",
                      "surface-tint": "#1b51dd",
                      "surface-container-highest": "#e2e2e2",
                      "surface-variant": "#e2e2e2",
                      "surface-dim": "#dadada",
                      "surface-bright": "#f9f9f9",
                      "primary-blue-dark": "#0F3BB7",
                      "background": "#f9f9f9",
                      "surface": "#f9f9f9",
                      "secondary": "#5a5f64",
                      "success-green": "#399E43",
                      "primary-blue-darker": "#092B89",
                      "on-secondary-container": "#5e6368",
                      "inverse-primary": "#b6c4ff",
                      "outline": "#747686",
                      "primary": "#003bb5",
                      "error-red": "#DB4241",
                      "tertiary-fixed-dim": "#ffb59b",
                      "neutral-light-gray": "#F4F4F5",
                      "on-tertiary-fixed-variant": "#822800",
                      "neutral-medium-gray": "#EEEEEE",
                      "tertiary-fixed": "#ffdbcf",
                      "accent-blue-light": "#8FB6FF",
                      "on-primary-fixed-variant": "#003ab3",
                      "on-error": "#ffffff",
                      "on-tertiary": "#ffffff",
                      "surface-container": "#eeeeee",
                      "on-background": "#1b1b1b",
                      "on-primary-container": "#d2d9ff",
                      "on-secondary-fixed": "#171c20",
                      "on-surface": "#1b1b1b",
                      "tertiary": "#842900",
                      "surface-container-low": "#f3f3f3",
                      "error-container": "#ffdad6",
                      "neutral-off-white": "#F5F9FF",
                      "outline-variant": "#c4c5d7",
                      "tertiary-container": "#ac3800",
                      "surface-container-high": "#e8e8e8",
                      "danger-red": "#F2706E",
                      "on-tertiary-container": "#ffd1c1",
                      "primary-fixed-dim": "#b6c4ff",
                      "secondary-container": "#dce0e6",
                      "error": "#ba1a1a",
                      "on-secondary-fixed-variant": "#42474c",
                      "inverse-on-surface": "#f1f1f1",
                      "on-primary": "#ffffff",
                      "neutral-dark-gray": "#27272A",
                      "on-error-container": "#93000a",
                      "surface-container-lowest": "#ffffff",
                      "secondary-fixed-dim": "#c2c7cd",
                      "primary-container": "#1d52de",
                      "inverse-surface": "#303030",
                      "neutral-charcoal": "#18181B",
                      "on-surface-variant": "#434655",
                      "secondary-fixed": "#dfe3e9",
                      "on-secondary": "#ffffff"
              },
              "borderRadius": {
                      "DEFAULT": "0.25rem",
                      "lg": "0.5rem",
                      "xl": "0.75rem",
                      "full": "9999px"
              },
              "spacing": {
                      "sidebar-width": "248px",
                      "lg": "24px",
                      "sm": "12px",
                      "xxl": "48px",
                      "base": "4px",
                      "xs": "8px",
                      "md": "16px",
                      "xl": "32px",
                      "layout-max": "1088px"
              },
              "fontFamily": {
                      "nav-display": [
                              "Work Sans", "sans-serif"
                      ],
                      "link-standalone": [
                              "Work Sans", "sans-serif"
                      ],
                      "h2-heading": [
                              "Manrope", "sans-serif"
                      ],
                      "h1-display": [
                              "Manrope", "sans-serif"
                      ],
                      "body-regular": [
                              "Work Sans", "sans-serif"
                      ],
                      "label-caption": [
                              "Work Sans", "sans-serif"
                      ],
                      "body-standard": [
                              "Work Sans", "sans-serif"
                      ]
              },
              "fontSize": {
                      "nav-display": [
                              "14px",
                              {
                                      "lineHeight": "20px",
                                      "fontWeight": "600"
                              }
                      ],
                      "link-standalone": [
                              "16px",
                              {
                                      "lineHeight": "24px",
                                      "fontWeight": "400"
                              }
                      ],
                      "h2-heading": [
                              "16px",
                              {
                                      "lineHeight": "22px",
                                      "fontWeight": "700"
                              }
                      ],
                      "h1-display": [
                              "24px",
                              {
                                      "lineHeight": "30px",
                                      "fontWeight": "700"
                              }
                      ],
                      "body-regular": [
                              "14px",
                              {
                                      "lineHeight": "20px",
                                      "fontWeight": "400"
                              }
                      ],
                      "label-caption": [
                              "12px",
                              {
                                      "lineHeight": "16px",
                                      "fontWeight": "400"
                              }
                      ],
                      "body-standard": [
                              "14px",
                              {
                                      "lineHeight": "19.25px",
                                      "fontWeight": "500"
                              }
                      ]
              }
      },
  },
  plugins: [],
}