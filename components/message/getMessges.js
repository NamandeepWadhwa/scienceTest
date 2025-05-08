export default function GetMessages(prevI, otherUserId) {
  let arr = [];
  let i = prevI === null ? 0 : prevI;

  while (i < prevI + 10 && i <= 1000) {
    if (i % 2 === 0) {
      arr.push({
        content: `This is from the other chat ${i}`,
        senderId: otherUserId,
      });
    } else {
      arr.push({
        content: `This message is from you ${i}`,
        senderId: "you",
      });
    }
    i++;
  }

  let data = {
    arr: arr,
    cursorId: arr.length > 0 ? i : null,
  };

  return data;
}
