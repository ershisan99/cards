module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: '#21268f',
                secondary: '#9a91c8',
                'secondary-light': '#dcccdb',
                'light-purple': '#d7d8ef',
                light: '#ececf9',
                warning: '#f1453d',
                slate: '#2d2e46',
                'light-gray': '#24254a',
                white: '#fff',
                cardModal: 'rgba(26, 26, 26, 0.8)',
            },
            fontFamily: {
                sans: ['Roboto'],
            },
            backgroundImage: {
                gradient: 'linear-gradient(180deg, #E6D4DE 0%, #9890C7 100%)',
            },
            boxShadow: {
                'button-primary':
                    '0px 4px 18px rgba(33, 38, 143, 0.35), inset 0px 1px 0px rgba(255, 255, 255, 0.3);',
            },
            spacing: {
                buttonx: '28px',
                buttony: '7px',
            },
        },
    },
}
