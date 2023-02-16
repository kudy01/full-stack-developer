import { organisation } from "./data";
import { IEmployee } from "./types";

let namesContainer = [<div></div>];

const buildHierarchy = (id?: number): any => {
  return organisation
    .filter((x) => x?.manager_id === id)
    .map((x) => {
      return {
        self: x,
        children: buildHierarchy(x.id),
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
        <p>
          {level === 0 ? (
            <>
              <strong>{orgObj.self.name}</strong>
              <hr />
            </>
          ) : (
            orgObj.self.name
          )}
        </p>
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
    debugger;
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

  const hierarchy = buildHierarchy();
  console.log("test", hierarchy);

  showNames(hierarchy, 0);

  return namesContainer;
};
