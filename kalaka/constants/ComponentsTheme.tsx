import { Icon } from "native-base";
import { color } from "native-base/lib/typescript/theme/styled-system";
import Colors from "./Colors";

export default {
    components: {
        Button: {
          variants: {
            outline: {
              bg: Colors.background,
              backgroundColor: Colors.background,
              borderWidth: 2,
              borderColor: Colors.primary,
              width: "90%",
              justifyContent: 'flex-start',
              alignSelf: 'center',
              _text: {
                color: Colors.text,
              },
            },
            logout: {
              bg: Colors.background,
              backgroundColor: Colors.background,
              borderWidth: 2,
              borderColor: Colors.danger,
              width: "90%",
              justifyContent: 'flex-start',
              alignSelf: 'center',
              _text: {
                color: Colors.danger,
              },
            }
          },
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
      },
    },
}

