import "./home.scss";
import "./home.desktop.scss";
import { useEffect, useRef, useState } from "react";
import { Heading } from "@chakra-ui/layout";
import { Button, Image } from "@chakra-ui/react";
import DataTable, { TableColumn } from "react-data-table-component";
import { ChatActionType, ChatContext, ChatContextType } from "types/chatAction";
import { Message, MessageType } from "types/index";
import { RecordRTCPromisesHandler, StereoAudioRecorder } from "recordrtc";
import {
  Menu,
  MenuItem,
  MenuButton
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';

import menuImg from "../../images/menu.png";
import micImg from "../../images/mic.png";
import homepage from "../../images/homepage.png";
import hp from "../../images/hp.png";
import scanpay from "../../images/scanpay.png";
import successful from "../../images/successful.png";
import pin from "../../images/pin.png";
import password from "../../images/password.png";

const supportedLangs = [
  {
    name: "Hindi",
    code: "hi"
  },
  {
    name: "Telugu",
    code: "te"
  },
  {
    name: "Kannada",
    code: "ka"
  },
  {
    name: "Malayalam",
    code: "ml"
  }
];

const actionToStringMap = {
  [ChatActionType.VIEW_ORDER]: "View Order",
  [ChatActionType.VIEW_ORDERS]: "View Orders",
  [ChatActionType.GO_BACK]: "Go Back",
  [ChatActionType.SHOW_MORE_ORDERS]: "Show More Orders",
  [ChatActionType.SHOW_MORE_PRODUCTS]: "Show More Products",
  [ChatActionType.VIEW_PRODUCTS]: "View Products",
  [ChatActionType.VIEW_PRODUCT]: "View Product",
  [ChatActionType.VIEW_PRODUCT_DETAILS]: "View Product Details",
  [ChatActionType.UPDATE_ORDER]: "Update Order",
  [ChatActionType.ORDER_STATUS]: "Order Status",
  [ChatActionType.ADD_PRODUCT]: "Add Product",
  [ChatActionType.UPDATE_PRODUCT]: "Update Product",
  [ChatActionType.SEARCH_CATALOGUE]: "Search Catalogue",
};

const chatContexts = {
  initialContext: {
    type: ChatContextType.INITIAL,
    actions: [ChatActionType.VIEW_ORDERS, ChatActionType.VIEW_PRODUCTS],
  },
  viewOrdersContext: {
    type: ChatContextType.VIEW_ORDERS,
    actions: [
      ChatActionType.SHOW_MORE_ORDERS,
      ChatActionType.UPDATE_ORDER,
      ChatActionType.ORDER_STATUS,
      ChatActionType.GO_BACK,
    ],
  },
  viewProductsContext: {
    type: ChatContextType.VIEW_PRODUCTS,
    actions: [
      ChatActionType.SHOW_MORE_PRODUCTS,
      ChatActionType.SEARCH_CATALOGUE,
      ChatActionType.ADD_PRODUCT,
      ChatActionType.UPDATE_PRODUCT,
      ChatActionType.GO_BACK,
    ],
  },
};

const initialMessages = [
  {
    id: "1",
    type: MessageType.TEXT,
    creatorId: "SERVER",
    content: "Hi, I am your personal assistant. How can I help you today?",
  },
];

export const CMessage = ({
  message,
}: {
  message: Message<keyof typeof MessageType>;
}) => {
  switch (message.type) {
    case MessageType.TEXT:
      return (
        <article
          className={`message ${message.creatorId === "SERVER" ? "received" : "sent"
            }`}
        >
          {message.content}
        </article>
      );
    default:
      return <article className="message-container">{message.content}</article>;
  }
};

let tableData: any[] = [];

const TabularDisplay = (props: any) => {
  return (
    <DataTable
      title={props.title}
      columns={props.columns}
      data={tableData}
      pagination
    />
  );
};

let recorder: RecordRTCPromisesHandler;
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices
    .getUserMedia({
      audio: true,
    })
    .then((stream) => {
      recorder = new RecordRTCPromisesHandler(stream, {
        type: "audio",
        mimeType: "audio/wav",
        sampleRate: 44100,
        recorderType: StereoAudioRecorder,
        numberOfAudioChannels: 1,
        timeSlice: 4000,
        desiredSampRate: 16000,
      });
      console.log("Recorder successfully created");
    });
}

const Home = () => {
  const [selectedLang, updateSelectedLang] = useState(supportedLangs[0]);
  const [currentContext, setCurrentContext] = useState<ChatContext>(
    chatContexts.initialContext
  );
  const [isRecording, setIsRecording] = useState(false);
  const chatContentRef = useRef<HTMLElement>(null);
  const [messages, updateMessages] =
    useState<Message<keyof typeof MessageType>[]>(initialMessages);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [imageUrl, setImageUrl] = useState(hp);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (chatContentRef.current?.scrollTo) {
      chatContentRef.current.scrollTo({
        top: chatContentRef.current?.scrollHeight,
        behavior: "smooth",
      });
    }
    const handleClick = (event) => {
          if (sectionRef.current && !sectionRef.current.contains(event.target)) return;
          setLoading(true);
          setTimeout(() => {
            if(count%5 == 0 ){
                setImageUrl(password)
                setCount(count+1)
            }
            if(count%5 == 1){
                setImageUrl(homepage)
                setCount(count+1)
            }
            if(count%5 == 2){
                setImageUrl(scanpay)
                setCount(count+1)
            }
            if(count%5 == 3){
                setImageUrl(pin)
                setCount(count+1)
            }
            if(count%5 == 4){
                setImageUrl(successful)
                setCount(count+1)
            }
            setLoading(false);
          }, 1000);
        };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  });

  const recordAudio = async () => {
    if (recorder) {
      if (isRecording) {
        setIsRecording(false);

        await recorder.stopRecording();

        const blob = await recorder.getBlob();

        const formData = new FormData();
        formData.append("senderId", "convo-commerce-ui");
        formData.append("sourceLang", selectedLang.code);
        formData.append("file", blob, "audio.wav");


        var details = {
            'client_id': 'local-language-support-client',
            'client_secret': '**********',
            'grant_type': 'client_credentials'
        };

        var formBody = [];
        for (var property in details) {
          var encodedKey = encodeURIComponent(property);
          var encodedValue = encodeURIComponent(details[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&")
        let token;
        await fetch(
                  "http://localhost:8082/realms/local-language-support-realm/protocol/openid-connect/token",
                  {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                      },
                    body: formBody,
                  }
                ).then(response => response.json())
                .then(data => {
                token=data.access_token
                })

        const resp = await fetch(
          "http://localhost:8080/v1/context/audio",
          {
            method: "POST",
            headers: {
                       'Authorization': 'Bearer ' + token
                   },
            body: formData,

          }
        );

        const context = await resp.json();
        handleAction(context);

      } else if (!isRecording) {
        setIsRecording(true);

        await recorder.reset();
        recorder.startRecording();
      }
    }
  };

  const handleAction = (context: ContextResponse) => {
    tableData = context.data;

    let image = `data:image/png;base64,${context.nextStep.message}`;
    setImageUrl(image)
    if (tableData == null || tableData.length == 0) {
      updateMessages([
        ...messages,
        {
          id: `${messages.length + 3}`,
          type: MessageType.TEXT,
          creatorId: "SERVER",
          content: <Image src={imageUrl} />,
        },
      ]);
    } else {
      updateMessages([
        ...messages,
        {
          id: `${messages.length + 2}`,
          type: MessageType.VIEW_PRODUCTS,
          creatorId: "SERVER",
          content: <TabularDisplay columns={getColumns(tableData)} title={context.context} />,
        },
        {
          id: `${messages.length + 3}`,
          type: MessageType.TEXT,
          creatorId: "SERVER",
          content: "Here are your results",
        },
      ]);
    }
  }

  const getColumns = (data: any[]) => {
    const columns: TableColumn<any>[] = [];
    Object.keys(data[0]).forEach(key => {
      const columnDef: TableColumn<any> = {
        name: key,
        selector: (row: any) => row[key],
        sortable: true
      };
      if (key === "ProdImg") {
        columnDef.name = "thumbnail";
        columnDef.sortable = false;
        columnDef.cell = props => (<img style={{ padding: '18px' }} src={props.ProdImg} width={70} alt="Product Image" />)
      }
      columns.push(columnDef)
    });
    return columns;
  }

  return (
    <>
      <main className="home-page" style={{marginLeft:'730px',maxWidth:'350px'}}>
        <article className="chat-box">
          <section className="chat-header">
            <Heading>One Nation</Heading>
          </section>
          <section className="chat-content" ref={sectionRef}>
                <Image src={imageUrl} style={{ height:'680px'}}/>
          </section>
          <section className="chat-input" style={{maxWidth:'350px'}}>
            <div style={{ maxWidth: '100px', display: 'inline' }}>
              <Menu menuButton={<MenuButton><Image src={menuImg} alt="menu" /></MenuButton>}>
                {
                  supportedLangs.map(lang =>
                    <MenuItem
                      value={lang}
                      onClick={e => { updateSelectedLang(e.value) }} >
                      {lang.name}
                    </MenuItem>
                  )
                }
              </Menu>
            </div>
            <div className="chat-context-actions-container">
              Speak in {selectedLang.name}
            </div>
            <div className={`mic-overlay ${isRecording ? "recording" : ""}`}>
              <Button borderRadius="25px" onClick={() => recordAudio()}>
                <Image src={micImg} alt="mic" />
              </Button>
            </div>
          </section>
        </article>
      </main>
    </>
  );
};

interface ContextResponse {
  nextStep: NextStep;
  data: any[];
  context: string;
}

interface NextStep {
  message: string;
  alternates: Alternates[]
}

interface Alternates {
  message: string;
  confidence: number;
}

export default Home;
