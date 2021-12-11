import Colors from "./Colors";

export default {
    components: {
        Button: {
            baseStyle: {
                rounded: 'full',
                marginTop: 3,
                bg: Colors.primary,
                backgroundColor: Colors.primary,
                width: "80%",
            },
        },
        Input: {
            baseStyle: {
                rounded: 'lg',
                marginTop: 5,
                width: "100%",
            },
            defaultProps: {
            },
        },
    },
}
