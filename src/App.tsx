import * as React from "react";
import { useState } from "react";
// import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  Input,
  Button,
  Flex,
  Image,
  Card,
  CardBody,
  Stack,
  Heading,
  Text,
  ScaleFade,
  Spinner,
  Box,
  ChakraProvider,
} from "@chakra-ui/react";
export default function App() {
  const [input, setInput] = useState<string>("");
  const [prompt, setPrompt] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const onSubmit = () => {
    const apiUrl =
      "https://script.google.com/macros/s/AKfycbx3yO-E0ha9Qdn4aRP_INxdVQtlz7uYHGTDod-tTPmW2pZG7Wmu6Yi13zFBFUnnv_ce/exec?prompt=" +
      encodeURIComponent(input);
    console.log(apiUrl);
    setPrompt(input);
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data?.url) {
          setResult(data.url);
        }
      })
      .catch((error) => console.error(error));
  };
  return (
    <ChakraProvider>
      <Box
        height="100vh"
        width="100vw"
        justifyContent="center"
        alignItems="center"
      >
        <Flex gap="2" p="4">
          <Input
            value={input}
            onChange={(e) => {
              setInput(e.currentTarget.value);
            }}
          />
          <Button onClick={onSubmit}>submit</Button>
        </Flex>
        {prompt && !result && (
          <Box
            w="100%"
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Box>
        )}
        <ScaleFade initialScale={0.9} in={result ? true : false}>
          <Card size="sm">
            <CardBody>
              {result && <Image src={result} alt={input} borderRadius="lg" />}
              <Stack mt="6" spacing="3">
                <Heading size="md">{prompt}</Heading>
              </Stack>
            </CardBody>
          </Card>
        </ScaleFade>
      </Box>
    </ChakraProvider>
  );
}
