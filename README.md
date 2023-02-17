# Skillfield Coding Challenge - Hierarchy Markup

## Problem

Below is employee data of a small company.
It represents the hierarchical relationship among employees. CEO of the company doesn't
have a manager

| Employee Name | Id  | Manager Id |     |     |     |     |     |     |     |     |     |     |     |     |     |     |     |     |     |
| ------------- | --- | ---------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Allan         | 100 | 150        |     |     |     |     |     |     |     |     |     |     |     |     |     |     |     |     |     |
| Martin        | 220 | 100        |     |     |     |     |     |     |     |     |     |     |     |     |     |     |     |     |     |
| Jamie         | 150 |            |     |     |     |     |     |     |     |     |     |     |     |     |     |     |     |     |     |
| Alex          | 275 | 100        |     |     |     |     |     |     |     |     |     |     |     |     |     |     |     |     |     |
| Steve         | 400 | 150        |     |     |     |     |     |     |     |     |     |     |     |     |     |     |     |     |     |
| David         | 190 | 400        |     |     |     |     |     |     |     |     |     |     |     |     |     |     |     |     |     |

Design a suitable representation of this data. Feel free to choose any database (RDBMS, inmemory database etc), file system or even a data structure like List or Map.
Then create a project and write code using any programming language that you are most comfortable with.
The display should be an **organisation hierarchy** as below:

| Jamie |       |        |     |     |     |     |     |     |     |     |     |     |     |     |
| ----- | ----- | ------ | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
|       | Allan |        |     |     |     |     |     |     |     |     |     |     |     |     |
|       |       | Martin |     |     |     |     |     |     |     |     |     |     |     |     |
|       |       | Alex   |     |     |     |     |     |     |     |     |     |     |     |     |
|       | Steve |        |     |     |     |     |     |     |     |     |     |     |     |     |
|       |       | David  |     |     |     |     |     |     |     |     |     |     |     |     |

The result can be simply displayed on the console, or HTML page or even a file; whatever
suits you. Try to cover all the possible scenarios, for example an employee with no manager, a
manager who is not valid employee; etc.
Pay more attention on writing the actual logic of representing the employee tabular data into
the hierarchical format

## Your Solution

The following sections will discuss each aspect of your solution.

### Data Representation

_UPDATE ME: Place here a sample of the data structure that you used to represent the input data._

```
Input data strcuture is taken in like this

const organisation = [
  {
    name: "test",
    id: 1,
    managerId: 2,
  },
  {
    name: "test2",
    id: 2,
  },
];
and then processed into a children level data strcuture through recursion :-
[
  {
    self: { name: "test2", id: 2 },
    children: [{ self: { name: "test", id: 1, manager_id: 2 }, children: [] }],
  },
];
```

### Traversal Algorithm

_UPDATE ME: Explain briefly the algorithim that you used to display the data in an hierarchical manner._

To convert the input strcuture into the heirarchial data structure, I used recursion, to generate a new data structure with keys as `self` and `children`, so essentially an array of objects representing the nodes of the tree

To display the heirarchial structure in HTMl specified format, I used two functions `loadNames` and `showNames`, The input data is an array of objects representing the nodes of the tree. The `loadNames` function generates HTML to display the name of each node and adds it to an array of JSX elements. The `showNames` function iterates over the array of nodes, calls `loadNames` to generate HTML for each node, and then recursively calls itself with the children of the current node (if any). Together, these functions generate an array of HTML elements representing the org chart

```
Paste your function/s here

To convert input data into heirarchial data:

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

To convert heirarchial data into html heirarchial display:

const showNames = (org: any, level: number) => {
  for (let i = 0; i < org.length; i++) {
    namesContainer = loadNames(org[i], namesContainer, level);

    if (org[i]["children"] && org[i]["children"].length) {
      showNames(org[i]["children"], level + 1);
    }
  }
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

```

### Display/Front-end Framework

I used React(typescript) as the front-end framework to display the data into HTML because react supports TSX, so I was able to use both my generation logic and create HTML elements in the same function. The reason I used typescript version of react is to support better typing(functions) and use of interfaces.

In case of a invalid manager, I have used `react-toastify` to dsiplay the error in a banner form (to test, simply add an invalid user in `data.tsx`), while displaying the organisation heirarchy, where as for an employee with no manager id, he becomes a CEO as specified.

### Test/Build/Running your Project

If someone were to run your application locally, what are the steps that needs to be done (ex. mvn clean package, yarn start) to view the output,

To run the project locally they should have node installed in their computer.
Upon cloning the folder, they should run:-

```
1. npm i
2. npm start

```

To run the server:-

```
1. cd server
2. npm i
3. npm run dev
```

## Taking the extra mile

_These are optional features but it should place you ahead of other candidates if implementated sucessfully_

### REST API

Implement a REST endpoint to **GET all employees** in your dataset. This should return an **array** of employees in **JSON format**.

```
{
    results:[
        {id:100,name:"Allan",manager_id:150},
        {id:220,name:"Martin",manager_id:100},
        .
        .
    ]
}
```

**Built a server and Implemented**

### Containerized Deployment (Docker) and Demo Link

_UPDATE ME: Containerize your application using **Docker** and publish it using any \*\*free cloud hosting environment of your choice (Netlify, Firebase, Azure, etc.). Add the link to this section._

### Adding unit tests

Add a testing library and include it as part of the build step. A single test case should be enough.

Added tests, to run test:

```
cd server
npm run test
```

## Criteria

Your work will be evaluated primarily on:

1. Consistency of **coding style**.
2. Proper **error handling**.
3. Correct use of Java **best practices**, including interface/object definitions.
4. **Completeness** and other value-adds (extra mile)
5. General **quality of code** and **technical communication**.

## How to submit your work

1. **Fork** this project on **BitBucket**. You will need to **create a free account** if you don't have one yet (https://bitbucket.org/account/signup/).
2. Update this README.md with all the details about your solution and how to run the project.
3. When you're finished, **send us the URL** of your public repository.
