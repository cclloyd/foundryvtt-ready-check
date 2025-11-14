module.exports = {
    semi: true,
    trailingComma: 'all',
    singleQuote: true,
    printWidth: 160,
    bracketSpacing: true,
    tabWidth: 4,
    error: {
        endOfLine: 'crlf',
    },
    quoteProps: 'as-needed',
    overrides: [
        {
            files: '*.hbs',
            options: {
                printWidth: 160,
            },
        },
    ],
};
