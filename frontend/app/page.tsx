"use client";
import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  Textarea,
  Input,
  VStack,
  HStack,
  Card,
  Spinner,
  Icon,
  Badge,
  Link,
  Code,
  ListItem,
} from "@chakra-ui/react";
import { saveContent, searchContent, rewriteContent } from "./fetch";
import { FaSave, FaSearch, FaMagic, FaBrain } from "react-icons/fa";
import { toaster } from "../components/ui/toaster";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Home() {
  const [content, setContent] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [rewriteText, setRewriteText] = useState("");

  const [relatedContent, setRelatedContent] = useState<
    { text: string; score: number }[]
  >([]);
  const [rewrittenContent, setRewrittenContent] = useState("");

  const [isSaving, setIsSaving] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isRewriting, setIsRewriting] = useState(false);

  const markdownComponents = {
    p: (props: any) => <Text {...props} mb={2} />,
    a: (props: any) => <Link color="cyan.300" {...props} />,
    code: (props: any) => <Code>{props.children}</Code>,
    ul: (props: any) => <Box as="ul" listStyleType="circle" {...props} />,
    li: (props: any) => <ListItem {...props} />,
  };
  const handleSaveContent = async () => {
    if (!content.trim()) {
      toaster.create({
        title: "Error",
        description: "Please enter some content to save",
        type: "error",
        duration: 3000,
      });
      return;
    }

    setIsSaving(true);
    try {
      await saveContent(content);
      setContent("");
      toaster.create({
        title: "Success",
        description: "Content saved successfully!",
        type: "success",
        duration: 3000,
      });
    } catch (error) {
      toaster.create({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to save content",
        type: "error",
        duration: 3000,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSearchContent = async () => {
    if (!searchQuery.trim()) {
      toaster.create({
        title: "Error",
        description: "Please enter a search query",
        type: "error",
        duration: 3000,
      });
      return;
    }

    setIsSearching(true);
    try {
      const results = await searchContent(searchQuery);
      setRelatedContent(results || []);
      if (!results || results.length === 0) {
        toaster.create({
          title: "No Results",
          description: "No related content found",
          type: "info",
          duration: 3000,
        });
      }
    } catch (error) {
      toaster.create({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to search content",
        type: "error",
        duration: 3000,
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleRewriteContent = async () => {
    if (!rewriteText.trim()) {
      toaster.create({
        title: "Error",
        description: "Please enter text to rewrite",
        type: "error",
        duration: 3000,
      });
      return;
    }

    setIsRewriting(true);
    try {
      const result = await rewriteContent(rewriteText);
      setRewrittenContent(result || { content: "" });
      if (!result) {
        toaster.create({
          title: "No Result",
          description: "Failed to rewrite content",
          type: "warning",
          duration: 3000,
        });
      }
    } catch (error) {
      toaster.create({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to rewrite content",
        type: "error",
        duration: 3000,
      });
    } finally {
      setIsRewriting(false);
    }
  };

  return (
    <Box
      minH="100vh"
      bg="gray.900"
      color="white"
      py={8}
      animationName="fadeIn"
      animationDuration="0.5s"
      animationTimingFunction="ease-out"
      animationFillMode="forwards"
    >
      <Container maxW="4xl">
        <VStack spaceX={8} align="stretch">
          {/* Header */}
          <Box
            textAlign="center"
            animationName="fadeIn"
            animationDuration="0.8s"
            animationTimingFunction="ease-out"
            animationFillMode="forwards"
          >
            <HStack justify="center" mb={4}>
              <Icon as={FaBrain} w={8} h={8} color="cyan.400" />
              <Heading size="2xl" color="cyan.400" ml={3}>
                Smart Content Assistant
              </Heading>
            </HStack>
            <Text fontSize="lg" color="gray.400">
              Store, search and improve your ideas with AI
            </Text>
          </Box>

          {/* Add Content */}
          <Card.Root
            bg="gray.800"
            border="1px solid"
            borderColor="gray.700"
            _hover={{
              borderColor: "cyan.400",
              animationName: "glow",
              animationDuration: "2s",
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
            }}
            // transition="all 0.3s"
            // animationName="fadeIn"
            // animationDuration="1s"
            // animationTimingFunction="ease-out"
            // animationFillMode="forwards"
          >
            <Card.Header>
              <HStack>
                <Icon as={FaSave} color="cyan.400" />
                <Heading size="md">Add Content</Heading>
              </HStack>
            </Card.Header>
            <Card.Body>
              <VStack spaceX={4}>
                <Textarea
                  placeholder="Enter your content here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  bg="gray.900"
                  border="1px solid"
                  borderColor="gray.600"
                  _hover={{ borderColor: "cyan.400" }}
                  _focus={{
                    borderColor: "cyan.400",
                    boxShadow: "0 0 0 1px cyan.400",
                  }}
                  resize="vertical"
                  minH="120px"
                  transition="all 0.3s"
                />
                <Button
                  onClick={handleSaveContent}
                  loading={isSaving}
                  loadingText="Saving..."
                  spinner={<Spinner size="sm" />}
                  bg="cyan.400"
                  color="black"
                  _hover={{ bg: "cyan.300", transform: "translateY(-2px)" }}
                  _active={{ transform: "translateY(0)" }}
                  transition="all 0.2s"
                  w="full"
                  size="lg"
                  spaceY={2}
                >
                  <Icon as={FaSave} />
                  Save Content
                </Button>
              </VStack>
            </Card.Body>
          </Card.Root>

          {/* Search */}
          <Card.Root
            bg="gray.800"
            border="1px solid"
            borderColor="gray.700"
            _hover={{
              borderColor: "cyan.400",
              animationName: "glow",
              animationDuration: "2s",
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
            }}
            // transition="all 0.3s"
            // animationName="fadeIn"
            // animationDuration="1.2s"
            // animationTimingFunction="ease-out"
            // animationFillMode="forwards"
          >
            <Card.Header>
              <HStack>
                <Icon as={FaSearch} color="cyan.400" />
                <Heading size="md">Search</Heading>
              </HStack>
            </Card.Header>
            <Card.Body>
              <VStack spaceX={4}>
                <Input
                  placeholder="Search for related content here..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  bg="gray.900"
                  border="1px solid"
                  borderColor="gray.600"
                  _hover={{ borderColor: "cyan.400" }}
                  _focus={{
                    borderColor: "cyan.400",
                    boxShadow: "0 0 0 1px cyan.400",
                  }}
                  transition="all 0.3s"
                />
                <Button
                  onClick={handleSearchContent}
                  loading={isSearching}
                  loadingText="Searching..."
                  spinner={<Spinner size="sm" />}
                  bg="cyan.400"
                  color="black"
                  _hover={{ bg: "cyan.300", transform: "translateY(-2px)" }}
                  _active={{ transform: "translateY(0)" }}
                  transition="all 0.2s"
                  w="full"
                  size="lg"
                  spaceY={2}
                >
                  <Icon as={FaSearch} />
                  Search
                </Button>

                {/* Search Results */}
                {relatedContent.length > 0 && (
                  <Box
                    w="full"
                    animationName="fadeIn"
                    animationDuration="0.5s"
                    animationTimingFunction="ease-out"
                    animationFillMode="forwards"
                    divideY="2px"
                  >
                    <Heading size="sm" mb={3} color="cyan.400">
                      Related Content ({relatedContent.length})
                    </Heading>
                    <VStack spaceX={3} align="stretch">
                      {relatedContent.map((item, index) => (
                        <Card.Root
                          key={index}
                          bg="gray.700"
                          size="sm"
                          // animationName="fadeIn"
                          // animationDuration={`${0.5 + index * 0.1}s`}
                          // animationTimingFunction="ease-out"
                          // animationFillMode="forwards"
                        >
                          <Card.Body>
                            <Text fontSize="sm">{item.text}</Text>
                            <Text fontSize="sm">{item.score}</Text>
                          </Card.Body>
                        </Card.Root>
                      ))}
                    </VStack>
                  </Box>
                )}
              </VStack>
            </Card.Body>
          </Card.Root>

          {/* Rewrite */}
          <Card.Root
            bg="gray.800"
            border="1px solid"
            borderColor="gray.700"
            _hover={{
              borderColor: "cyan.400",
              animationName: "glow",
              animationDuration: "2s",
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
            }}
            // transition="all 0.3s"
            // animationName="fadeIn"
            // animationDuration="1.4s"
            // animationTimingFunction="ease-out"
            // animationFillMode="forwards"
          >
            <Card.Header>
              <HStack>
                <Icon as={FaMagic} color="cyan.400" />
                <Heading size="md">Rewrite</Heading>
              </HStack>
            </Card.Header>
            <Card.Body>
              <VStack spaceX={4}>
                <Textarea
                  placeholder="Improve your content here..."
                  value={rewriteText}
                  onChange={(e) => setRewriteText(e.target.value)}
                  bg="gray.900"
                  border="1px solid"
                  borderColor="gray.600"
                  _hover={{ borderColor: "cyan.400" }}
                  _focus={{
                    borderColor: "cyan.400",
                    boxShadow: "0 0 0 1px cyan.400",
                  }}
                  resize="vertical"
                  minH="120px"
                  transition="all 0.3s"
                />
                <Button
                  onClick={handleRewriteContent}
                  loading={isRewriting}
                  loadingText="Rewriting..."
                  spinner={<Spinner size="sm" />}
                  bg="cyan.400"
                  color="black"
                  _hover={{ bg: "cyan.300", transform: "translateY(-2px)" }}
                  _active={{ transform: "translateY(0)" }}
                  transition="all 0.2s"
                  w="full"
                  size="lg"
                  spaceY={2}
                >
                  <Icon as={FaMagic} />
                  Rewrite
                </Button>

                {/* Rewritten Content */}
                {rewrittenContent && (
                  <Box
                    w="full"
                    // animationName="fadeIn"
                    // animationDuration="0.5s"
                    // animationTimingFunction="ease-out"
                    // animationFillMode="forwards"
                    // divideY="2px"
                  >
                    <HStack mb={3}>
                      <Badge colorScheme="cyan" variant="subtle">
                        AI Rewritten
                      </Badge>
                    </HStack>
                    <Card.Root
                      bg="gray.700"
                      // animationName="fadeIn"
                      // animationDuration="0.6s"
                      // animationTimingFunction="ease-out"
                      // animationFillMode="forwards"
                    >
                      <Card.Body>
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={markdownComponents}
                        >
                          {rewrittenContent}
                        </ReactMarkdown>
                      </Card.Body>
                    </Card.Root>
                  </Box>
                )}
              </VStack>
            </Card.Body>
          </Card.Root>
        </VStack>
      </Container>
    </Box>
  );
}
