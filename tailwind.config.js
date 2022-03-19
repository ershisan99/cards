module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    darkMode: 'class',
    theme: {
        colors: {
            primary: '#21268f',
            secondary: '#9a91c8',
            'light-purple': '#d7d8ef',
            light: '#ececf9',
            warning: '#f1453d',
            slate: '#2d2e46',
        },
        extend: {
            fontFamily: {
                sans: ['SF UI Display'],
                sf: 'SF UI Display',
                poppins: 'Poppins',
                lato: 'Lato',
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
    plugins: [require('@tailwindcss/typography')],
}
