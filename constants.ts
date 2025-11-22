import { LayerInfo, TcpLayerInfo, EngineeringLayerInfo } from './types';

export const OSI_LAYERS: LayerInfo[] = [
  {
    id: 7,
    name: "应用层",
    enName: "Application",
    description: "这一层就是你平时用到的所有网络协议。提供网络服务：浏览网页、发邮件、文件传输。是真正面对用户和应用的层。用户看到啥，这层就干啥。",
    protocols: ["HTTP/HTTPS", "DNS", "SMTP", "FTP", "SSH"],
    summary: "用户直接交互的一层，真正面对应用。",
    color: "bg-rose-500",
    icon: "🖥️"
  },
  {
    id: 6,
    name: "表示层",
    enName: "Presentation",
    description: "负责数据格式转换。如果应用 A 用 JSON，而 B 用 XML，这层负责转换。功能包括加密/解密（TLS）、压缩/解压、编码翻译（UTF-8 等）。",
    protocols: ["TLS/SSL", "JSON/XML", "UTF-8", "JPEG"],
    summary: "负责数据的“包装”与“翻译”。",
    color: "bg-rose-400",
    icon: "🎁"
  },
  {
    id: 5,
    name: "会话层",
    enName: "Session",
    description: "管理连接的生命周期。维护会话的建立、保持和终止。处理断点续传、会话恢复、控制双工模式。",
    protocols: ["RPC", "NetBIOS", "SQL Session"],
    summary: "管理连接的生命周期（建立/保持/终止）。",
    color: "bg-rose-300",
    icon: "🤝"
  },
  {
    id: 4,
    name: "传输层",
    enName: "Transport",
    description: "端到端通信。解决从源主机程序到目标主机程序如何可靠、高效地传输。不是发到机器，是发到“程序”（端口）。TCP（可靠）vs UDP（快速）。",
    protocols: ["TCP (可靠)", "UDP (快速)"],
    summary: "端到端通信大脑（找程序，不找机器）。",
    color: "bg-amber-500",
    icon: "🚚"
  },
  {
    id: 3,
    name: "网络层",
    enName: "Network",
    description: "跨网段通信的大脑。负责 IP 地址分配与寻址、路由选择（Route）。解决“不同局域网之间怎么找到目的地”。",
    protocols: ["IP (IPv4/v6)", "ICMP", "OSPF", "BGP"],
    summary: "跨网段通信的大脑（找路径，找IP）。",
    color: "bg-emerald-500",
    icon: "🗺️"
  },
  {
    id: 2,
    name: "数据链路层",
    enName: "Data Link",
    description: "局域网内部通信层。使用 MAC 地址在同一局域网内定位设备。负责组装/拆解帧、错误检测、流控。三层交换机和二层交换机的主要区别就在这层往上。",
    protocols: ["Ethernet", "MAC", "ARP", "VLAN"],
    summary: "局域网内部通信层（找MAC，找设备）。",
    color: "bg-blue-500",
    icon: "🔗"
  },
  {
    id: 1,
    name: "物理层",
    enName: "Physical",
    description: "只关心两件事：传输介质（光纤、电缆、无线电）和信号编码（调制/发送）。它不认识数据是什么，只负责“发电流/光脉冲”。",
    protocols: ["Fiber", "Cat6", "WiFi", "4G/5G"],
    summary: "只负责“发电流/光脉冲”。",
    color: "bg-slate-500",
    icon: "🔌"
  }
];

export const TCP_LAYERS: TcpLayerInfo[] = [
  {
    name: "应用层",
    osiMapping: [7, 6, 5],
    description: "OSI 7/6/5 层的合并。处理高层数据、编码和会话。",
    color: "bg-rose-600"
  },
  {
    name: "传输层",
    osiMapping: [4],
    description: "对应 OSI 传输层。TCP/UDP 核心区域。",
    color: "bg-amber-600"
  },
  {
    name: "网络层",
    osiMapping: [3],
    description: "对应 OSI 网络层。IP 路由核心。",
    color: "bg-emerald-600"
  },
  {
    name: "网络接口层",
    osiMapping: [2, 1],
    description: "OSI 2/1 层的合并。物理连接与数据帧。",
    color: "bg-blue-700"
  }
];

export const ENGINEERING_LAYERS: EngineeringLayerInfo[] = [
  {
    level: "L3",
    name: "网络层 (Network)",
    device: "路由器 / 三层交换机",
    concepts: ["IP Routing", "Gateway", "Subnet Isolation"],
    description: "负责跨网段通信。核心动作：IP 路由。",
    color: "bg-emerald-500"
  },
  {
    level: "L2",
    name: "数据链路层 (Data Link)",
    device: "二层交换机 (Switch)",
    concepts: ["VLAN", "MAC Address", "Ethernet Frames"],
    description: "负责同网段通信。核心动作：MAC 寻址。",
    color: "bg-blue-500"
  },
  {
    level: "L1",
    name: "物理层 (Physical)",
    device: "网线 / 光纤 / Hub",
    concepts: ["Electrical Signals", "Light Pulses", "Radio Waves"],
    description: "负责物理传输。核心动作：比特流传输。",
    color: "bg-slate-500"
  }
];