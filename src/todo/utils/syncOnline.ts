import { ToDoItemProps } from "./todoReducer";

// 同步数据到维格表
export const syncToViaka = (todoItem: ToDoItemProps) => {
  fetch("_替换成你的API_URL_", {
    method: "post",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer _替换成你的API_Token_",
    },
    body: JSON.stringify({
      records: [
        {
          fields: {
            title: todoItem.title,
            content: "",
          },
        },
      ],
      fieldKey: "name",
    }),
  })
    .then(function (response) {
      if (response.ok) {
        response.json().then((json) => {
          console.log(json.result);
        });
      }
    })
    .catch(function (err) {
      console.log("Fetch错误:" + err);
    });
};
