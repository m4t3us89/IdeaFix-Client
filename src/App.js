
import Nota from './pages/notas';
import { ChakraProvider, extendTheme  } from "@chakra-ui/react"

const theme  = extendTheme({
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
  textStyles: {
    h1: {
      fontSize: ["48px", "72px"],
      fontWeight: "bold",
      lineHeight: "110%",
      letterSpacing: "-2%",
    },
    h2: {
      fontSize: ["30px", "35px"],
      fontWeight: "semibold",
      lineHeight: "110%",
      letterSpacing: "-1%",
      margin: ["0 0 3px 0", "0 0 3px 0", "0 0 48px 0"],
      color: 'purple'
    },
    h3: {
      fontSize: ["18px", "24px"],
      fontWeight: "semibold",
      lineHeight: "110%",
      letterSpacing: "-1%",
      margin: ["0 0 5px 0","0 0 5px 0", "0 0 50px 0"],
      color: 'purple'
    }
  },
})


function App() {
  return (
    <ChakraProvider theme={theme}>
          <Nota bg="brand.700"/>
    </ChakraProvider>
  );
}

export default App;
