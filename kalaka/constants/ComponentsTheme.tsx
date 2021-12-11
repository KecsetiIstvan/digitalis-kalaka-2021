import Colors from "./Colors";

export default {
    components: {
        Button: {
            baseStyle: () => ({
                bg: Colors.primary,
                backgroundColor: Colors.primary,
                rounded: 'full',
                margin: '1.5',
              }),
        },
        
    },
}