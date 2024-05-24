import {
  Box,
  Input,
  Tag,
  // TagLabel,
  // TagLeftIcon,
  // TagRightIcon,
  // TagCloseButton,
  Flex,
  // List,
  // ListItem,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

import "../../assets/css/Input.css";
import ListItems from "../ListItems/ListItems";
import Tags from "../Tags/Tags";

type Tag = {
  category: string;
  id: string;
  name: string;
  value: number;
};

type Props = {
  dataTags: Tag[];
  changeCount: React.Dispatch<React.SetStateAction<number>>;
};

const InputCustom = ({ dataTags, changeCount }: Props) => {
  const [tags, setTags] = useState<Tag[]>(dataTags);
  const [selectTags, setSelectTags] = useState<Tag[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [inputSings, setInputSings] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    // tags.filter((tag) => tag.name.includes(inputValue));
      
    inputValue.length > 0 &&
    setTags(tags.filter((tag) => tag.name.includes(inputValue)));
  }, [inputValue]);

  useEffect(() => {
    changeCount(state => calculateResult(selectTags, inputSings, state))
    selectTags.length === 0 && changeCount(0)
    selectTags.length === 0 && setInputSings([])
  }, [selectTags, inputSings])


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.match(/[+\-*()^/]/)) {
      setInputSings(state => [...state, value])
      setInputValue('')
    } else {
      setInputValue(event.target.value);
    }
    
  };

  const operators: { [key: string]: (a: number, b: number) => number } = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => {
      if (b === 0) throw new Error('Division by zero');
      return a / b;
    },
  };

  const calculateResult = (tags: Tag[], signs: string[], start: number): number => {

    return tags.slice(1).reduce<number>((acc, tag, index) => {
      const operator = signs[index];
      const operation = operators[operator];

      if (!operation) {
        throw new Error(`Unknown operator: ${operator}`);
      }

      return operation(acc, tag.value);
    }, start);
  };

  
 

  const handleInputKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      // setInputValue("");
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    setSelectTags(selectTags.filter((tag) => tag.id !== tagToRemove));
  };

  const handleContainerClick = () => {
    inputRef.current && inputRef.current.focus();
  };

  return (
    <Box w={"50%"} margin={"0 auto"} position={"relative"}>
      <Flex
        display="inline-flex"
        border="1px solid #CBD5E0"
        borderRadius="md"
        p="2"
        alignItems="center"
        onClick={handleContainerClick}
        minH="50px"
        w="100%"
        // flexWrap={"wrap"}
        gap={"5px"}
      >
        {/* {
        inputValue.split(' ').map(item => 
          (item === '*' || item === '+' || item === '/' || item === '-') ? item :  <Tag
          key={item.id + item.name + item.value}
          variant="solid"
          colorScheme="blue"
          mr="2"
          mb="2"
        >
          <TagLabel className="text-3xl">{item.name}</TagLabel>
          <TagCloseButton onClick={() => handleTagRemove(item.id)} />
        </Tag>
        )
        } */}

        {/* <Box contentEditable={true}  ref={inputRef} border={'none'} outline={'none'}> */}
        {selectTags.length > 0 && (
          <Tags selectTags={selectTags} inputSings={inputSings} handleTagRemove={handleTagRemove}/>
        )}
        {/* </Box> */}

        <Input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleInputKeyPress}
          placeholder=""
          w={"100%"}
          h={"100%"}
          p={0}
          pl={1}
          // size="sm"
          border="none"
          // display={'none'}
          _focus={{
            boxShadow: "none",
          }}
          ref={inputRef}
        />
      </Flex>

      { inputValue.length > 0  && (
        <ListItems
          tags={tags}
          setInputValue={setInputValue}
          setSelectTags={setSelectTags}
        />
      )}
    </Box>
  );
};

export default InputCustom;
