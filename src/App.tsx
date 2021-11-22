import { useState } from "react";
import "./styles.css";

const getImageFromASIN = (asin: string) =>
  `https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=${asin}&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=SL250`;
const getASINFromURL = (prodUrl: string) => {
  const parts = prodUrl.split("/");
  return parts[parts.length - 1];
};

const useAmazonImage = (prodUrl: string) => {
  return { src: getImageFromASIN(getASINFromURL(prodUrl)) };
};

export default function App() {
  const [csv, setCsv] = useState("");
  const [parsed, setParsed] = useState<Line[]>();
  const parseLine = (line: any) => {
    const arr = line.split(",");
    return {
      asin: arr[0],
      link: arr[1],
      group: arr[2],
      brand: arr[3],
      prodName: arr[4],
      price: arr[5],
      category: arr[6]
    };
  };
  const onSetCSV = (e: any) => {
    const val: string = e.value;
    setCsv(val);
    const lines: Line[] = val.split("\n").map((line) => parseLine(line));
    setParsed(lines);
  };
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>

      {<textarea value={csv} onChange={onSetCSV}></textarea>}

      {parsed && parsed.map((v) => <AmazonItem line={v} />)}
    </div>
  );
}
interface Line {
  asin: string;
  link: string;
  group: string;
  brand: string;
  prodName: string;
  price: string;
  category: string;
}

const AmazonItem = (props: any) => {
  const {
    line: { asin, link, group, brand, prodName, price, category }
  } = props;
  const src = getImageFromASIN(asin);
  return (
    <div>
      <div>
        <a href={link}>{prodName}</a>
      </div>
      <div>
        <img src={src} />
      </div>
      <div>{group}</div>
      <div>{brand}</div>
      <div>{price}</div>
      <div>{category}</div>
    </div>
  );
};
