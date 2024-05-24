import { List, ListItem } from "@chakra-ui/react";

type Tag = {
  category: string;
  id: string;
  name: string;
  value: number;
};
const ListItems = ({
  tags,
  setInputValue,
  setSelectTags
}: {
  tags: Tag[];
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  setSelectTags: React.Dispatch<React.SetStateAction<Tag[]>>
}) => {
  console.log(tags);
  
  return (
    <List
      position={"absolute"}
      top={"60px"}
      width={"100%"}
      overflow={"auto"}
      maxH={"300px"}
      className="inputListScroll"
    >
      {tags.map((tag, i) => {
        return (
          <ListItem
            cursor={"pointer"}
            padding={"5px 10px"}
            m={1}
            border={"2px solid #000"}
            key={tag.id + tag.name + tag.value + i}
            onClick={() => {
              setInputValue("");
              setSelectTags((state) => [...state, tag]);
            }}
          >
            {tag.name}
          </ListItem>
        );
      })}
    </List>
  );
};

export default ListItems;
