import { Box, Button } from "@material-ui/core";
import { produce } from "immer";
import React, { useState } from "react";
import { useEffect } from "react";
import { generate } from "shortid";

interface Items {
  id: number;
  description: string;
  amount: number;
}

const Particulars = (props: any) => {
  const [item, setItem] = useState<Items[]>([
    { id: 1, description: "", amount: 0 },
  ]);

  useEffect(() => {
    if (props.handleItemsValidation) {
      props.handleItemsValidation(checkEmpty(item), item);
    }
  }, [item]);
  const checkEmpty = (items: any) => {
    return Object.values(items).every(
      (x: any) => x.description.length && x.amount
    );
  };
  return (
    <Box style={{ textAlign: "left" }}>
      <Box px={1} py={3}>
        <Button
          variant="contained"
          onClick={() => {
            setItem((items) => [
              ...items,
              {
                id: items?.length + 1 || 0,
                description: "",
                amount: 0,
              },
            ]);
          }}
        >
          Add lines
        </Button>
      </Box>
      {item.map((p, index) => {
        return (
          <Box
            key={p.id}
            my={2}
            style={{ display: "flex", justifyContent: "space-around" }}
          >
            <label>{p.id}</label>
            <input
              onChange={(e) => {
                const description = e.target.value;
                setItem((items) =>
                  produce(items, (v) => {
                    v[index].description = description.trim();
                  })
                );
              }}
              value={p.description}
              placeholder="Description"
            />
            <input
              onChange={(e) => {
                const amount = parseInt(e.target.value);
                setItem((items) =>
                  produce(items, (v) => {
                    v[index].amount = amount;
                  })
                );
              }}
              type={"number"}
              value={p.amount}
              placeholder="Amount"
            />
            <Button
              variant="contained"
              disabled={item.length === 1}
              onClick={() => {
                setItem((items) =>
                  items
                    .filter((x) => x.id !== p.id)
                    .map((x, index) => {
                      const updatedItems = { ...x };
                      updatedItems.id = index + 1;
                      return updatedItems;
                    })
                );
              }}
            >
              x
            </Button>
          </Box>
        );
      })}
      <div>
        {/* {JSON.stringify(item, null, 2)}
        {"" + checkEmpty(item)} */}
      </div>
    </Box>
  );
};

export default React.memo(Particulars);
