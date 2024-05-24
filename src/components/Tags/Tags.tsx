import { Flex, Tag, TagCloseButton } from "@chakra-ui/react";

type Tag = {
  category: string;
  id: string;
  name: string;
  value: number;
};

const Tags = ({
  selectTags,
  handleTagRemove,
  inputSings

}: {
  selectTags: Tag[];
  handleTagRemove: (tagToRemove: string) => void;
  inputSings: string[]
}) => {
  return (
    <Flex gap={"12px"} flex={"wrap"}>
      {selectTags.map((tag, i) => (
        <>
        <Tag
          key={tag.id + tag.name + tag.value + i}
          variant="solid"
          color={"white"}
          bg={"#001133"}
          // w={"100%"}
          minW={"max-content"}
        >
          {tag.name}
          <TagCloseButton onClick={() => handleTagRemove(tag.id)} />
        </Tag>
        {inputSings[i]}
        </>
        
      ))}
    </Flex>
  );
};

export default Tags;
