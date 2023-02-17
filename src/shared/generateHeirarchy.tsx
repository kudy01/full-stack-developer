import { IEmployee } from "./types";

let namesContainer = [<div></div>];

const buildHierarchy = (data: IEmployee[], id?: number): any => {
  return data
    .filter((x) => x?.manager_id === id)
    .map((x) => {
      return {
        self: x,
        children: buildHierarchy(data, x.id),
      };
    });
};

const loadNames = (
  orgObj: any,
  namesContainer: JSX.Element[],
  level: number
) => {
  let nameHtml = (
    <div
      style={{
        paddingLeft: `${level * 100}px`,
      }}
    >
      <div>
        <div
          style={{
            margin: "16px 0px",
          }}
        >
          {level === 0 ? (
            <>
              <strong>{orgObj.self.name}</strong>
              <hr />
            </>
          ) : (
            orgObj.self.name
          )}
        </div>
      </div>
    </div>
  );

  namesContainer.push(nameHtml);

  return namesContainer;
};

const showNames = (org: any, level: number) => {
  for (let i = 0; i < org.length; i++) {
    namesContainer = loadNames(org[i], namesContainer, level);

    if (org[i]["children"] && org[i]["children"].length) {
      showNames(org[i]["children"], level + 1);
    }
  }
};

export const generateHeirarchy = (data: IEmployee[]) => {
  // let ids = [] as number[];

  // data.map((x: IEmployee) => ids.push(x.id));

  // console.log("ttt", ids);

  //   try {
  //     data.map((x: IEmployee) => {
  //       if (!ids.includes(x.manager_id!)) throw new Error("Invalid manager");
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }

  const hierarchy = buildHierarchy(data);

  showNames(hierarchy, 0);

  return namesContainer;
};
