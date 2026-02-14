import React from 'react';

interface DecryptedTextProps {
    text: string;
    className?: string;
    delay?: number;
}

export const DecryptedText: React.FC<DecryptedTextProps> = ({ text, className, delay = 0 }) => {
    const [displayText, setDisplayText] = React.useState('');
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01233456789@#$%^&*()';

    React.useEffect(() => {
        let iterations = 0;
        const interval = setInterval(() => {
            setDisplayText(
                text.split('')
                    .map((char, index) => {
                        if (index < iterations) return text[index];
                        return characters[Math.floor(Math.random() * characters.length)];
                    })
                    .join('')
            );

            if (iterations >= text.length) clearInterval(interval);
            iterations += 1 / 3;
        }, 30);

        return () => clearInterval(interval);
    }, [text]);

    return <span className={className}>{displayText}</span>;
};
