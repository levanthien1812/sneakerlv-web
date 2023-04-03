import React, { useState } from "react";
import AddSneaker from "../components/AddSneaker";
import AddCategories from "../components/AddCategories";
import { Button } from "@mui/material";

function SneakerPage() {
  // manage fields states
  const [newSneaker, setNewSneaker] = useState({});
  const [newSneakerCategories, setNewSneakerCategories] = useState([]);

  const saveSneakerHandler = (snk) => {
    setNewSneaker(snk);
  };

  console.log(newSneaker);
  console.log(newSneakerCategories);

  const saveHandler = async () => {
    const sneakerFormdata = new FormData();
    sneakerFormdata.append("id", newSneaker.id);
    sneakerFormdata.append("name", newSneaker.name);
    sneakerFormdata.append("brand", newSneaker.brand);
    sneakerFormdata.append("description", newSneaker.description);
    sneakerFormdata.append("coverImage", newSneaker.coverImage);

    const sneakerResponse = await fetch("http://localhost:3000/api/sneakers", {
      method: "post",
      body: sneakerFormdata,
    });

    if (!sneakerResponse.ok) {
      throw new Error("Fail!");
    } else {
      console.log("Success!");
    }

    await Promise.all(
      newSneakerCategories.forEach(async (snkCate) => {
        const categoryFormdata = new FormData();

        categoryFormdata.append("image", snkCate.image);
        categoryFormdata.append("color", snkCate.color);
        categoryFormdata.append("quantity", snkCate.quantity);
        categoryFormdata.append("categoryId", snkCate.categoryId);
        categoryFormdata.append("size", snkCate.size);
        categoryFormdata.append("price", snkCate.price);
        categoryFormdata.append("sneaker", newSneaker.id);

        const categoryResponse = await fetch(
          "http://localhost:3000/api/sneakers/categories",
          {
            method: "POST",
            body: categoryFormdata,
          }
        );
        if (!categoryResponse.ok) {
          throw new Error("Fail!");
        } else {
          console.log("Success!");
        }
      })
    );
  };

  return (
    <>
      <AddSneaker onMoveToNext={saveSneakerHandler} />
      <AddCategories setNewSneakerCategories={setNewSneakerCategories} />
      <div>
        <Button variant="contained" onClick={saveHandler}>
          Lưu
        </Button>
      </div>
    </>
  );
}

export default SneakerPage;
