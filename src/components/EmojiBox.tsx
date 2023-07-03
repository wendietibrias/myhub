import EmojiPicker from "emoji-picker-react";
import { IEmojiProps } from "../interfaces/props.interface";

const EmojiBox = ({
  emojiClick
} : IEmojiProps) => {
   return (
     <div className="absolute top-15 right-0">
       <EmojiPicker onEmojiClick={emojiClick} />
     </div>
   )
}

export default EmojiBox;