using System.Collections.ObjectModel;
using System;
using System.Collections.Generic;
using System.Text;
using System.Runtime.InteropServices;

namespace DetectSerialPort
{
    public class USB
    {
        #region API

        #region Constants

        const int GENERIC_WRITE = 0x40000000;
        const int FILE_SHARE_READ = 0x1;
        const int FILE_SHARE_WRITE = 0x2;
        const int OPEN_EXISTING = 0x3;
        const int INVALID_HANDLE_VALUE = -1;

        const int IOCTL_GET_HCD_DRIVERKEY_NAME = 0x220424;
        const int IOCTL_USB_GET_ROOT_HUB_NAME = 0x220408;
        const int IOCTL_USB_GET_NODE_INFORMATION = 0x220408;    // same as above... strange, eh? 
        const int IOCTL_USB_GET_NODE_CONNECTION_INFORMATION_EX = 0x220448;
        const int IOCTL_USB_GET_DESCRIPTOR_FROM_NODE_CONNECTION = 0x220410;
        const int IOCTL_USB_GET_NODE_CONNECTION_NAME = 0x220414;
        const int IOCTL_USB_GET_NODE_CONNECTION_DRIVERKEY_NAME = 0x220420;

        const int USB_DEVICE_DESCRIPTOR_TYPE = 0x1;
        const int USB_STRING_DESCRIPTOR_TYPE = 0x3;

        const int BUFFER_SIZE = 2048;
        const int MAXIMUM_USB_STRING_LENGTH = 255;

        //const string GUID_DEVINTERFACE_HUBCONTROLLER = "3abf6f2d-71c4-462a-8a92-1e6861e6af27"; //standart
        //const string REGSTR_KEY_USB = "USB";
        const string GUID_DEVINTERFACE_COMPORT = "4d36e978-e325-11ce-bfc1-08002be10318"; //standart
        const string REGSTR_KEY_COM = "DLSUSB_05F9_4204";
        const int DIGCF_PRESENT = 0x2;
        const int DIGCF_ALLCLASSES = 0x4;
        const int DIGCF_DEVICEINTERFACE = 0x10;
        const int SPDRP_DRIVER = 0x9;
        const int SPDRP_DEVICEDESC = 0x0;
        const int REG_SZ = 1;

        #endregion

        #region Enumerations

        //typedef enum _USB_HUB_NODE { 
        //    UsbHub, 
        //    UsbMIParent 
        //} USB_HUB_NODE; 
        enum USB_HUB_NODE
        {
            UsbHub,
            UsbMIParent
        }

        //typedef enum _USB_CONNECTION_STATUS { 
        //    NoDeviceConnected, 
        //    DeviceConnected, 
        //    DeviceFailedEnumeration, 
        //    DeviceGeneralFailure, 
        //    DeviceCausedOvercurrent, 
        //    DeviceNotEnoughPower, 
        //    DeviceNotEnoughBandwidth, 
        //    DeviceHubNestedTooDeeply, 
        //    DeviceInLegacyHub 
        //} USB_CONNECTION_STATUS, *PUSB_CONNECTION_STATUS; 
        private enum USB_CONNECTION_STATUS
        {
            NoDeviceConnected,
            DeviceConnected,
            DeviceFailedEnumeration,
            DeviceGeneralFailure,
            DeviceCausedOvercurrent,
            DeviceNotEnoughPower,
            DeviceNotEnoughBandwidth,
            DeviceHubNestedTooDeeply,
            DeviceInLegacyHub
        }

        //typedef enum _USB_DEVICE_SPEED { 
        //    UsbLowSpeed = 0, 
        //    UsbFullSpeed, 
        //    UsbHighSpeed 
        //} USB_DEVICE_SPEED; 
        enum USB_DEVICE_SPEED : byte
        {
            UsbLowSpeed,
            UsbFullSpeed,
            UsbHighSpeed
        }

        #endregion

        #region Stuctures

        //typedef struct _SP_DEVINFO_DATA { 
        //  DWORD cbSize; 
        //  GUID ClassGuid; 
        //  DWORD DevInst; 
        //  ULONG_PTR Reserved; 
        //} SP_DEVINFO_DATA,  *PSP_DEVINFO_DATA; 
        [StructLayout(LayoutKind.Sequential)]
        struct SP_DEVINFO_DATA
        {
            public int cbSize;
            public Guid ClassGuid;
            public IntPtr DevInst;
            public IntPtr Reserved;
        }

        //typedef struct _SP_DEVICE_INTERFACE_DATA { 
        //  DWORD cbSize; 
        //  GUID InterfaceClassGuid; 
        //  DWORD Flags; 
        //  ULONG_PTR Reserved; 
        //} SP_DEVICE_INTERFACE_DATA,  *PSP_DEVICE_INTERFACE_DATA; 
        [StructLayout(LayoutKind.Sequential)]
        struct SP_DEVICE_INTERFACE_DATA
        {
            public int cbSize;
            public Guid InterfaceClassGuid;
            public int Flags;
            public IntPtr Reserved;
        }

        //typedef struct _SP_DEVICE_INTERFACE_DETAIL_DATA { 
        //  DWORD cbSize; 
        //  TCHAR DevicePath[ANYSIZE_ARRAY]; 
        //} SP_DEVICE_INTERFACE_DETAIL_DATA,  *PSP_DEVICE_INTERFACE_DETAIL_DATA; 
        [StructLayout(LayoutKind.Sequential, CharSet = CharSet.Auto)]
        struct SP_DEVICE_INTERFACE_DETAIL_DATA
        {
            public int cbSize;
            [MarshalAs(UnmanagedType.ByValTStr, SizeConst = BUFFER_SIZE)]
            public string DevicePath;
        }

        //typedef struct _USB_HCD_DRIVERKEY_NAME { 
        //    ULONG ActualLength; 
        //    WCHAR DriverKeyName[1]; 
        //} USB_HCD_DRIVERKEY_NAME, *PUSB_HCD_DRIVERKEY_NAME; 
        [StructLayout(LayoutKind.Sequential, CharSet = CharSet.Auto)]
        struct USB_HCD_DRIVERKEY_NAME
        {
            public int ActualLength;
            [MarshalAs(UnmanagedType.ByValTStr, SizeConst = BUFFER_SIZE)]
            public string DriverKeyName;
        }

        //typedef struct _USB_ROOT_HUB_NAME { 
        //    ULONG  ActualLength; 
        //    WCHAR  RootHubName[1]; 
        //} USB_ROOT_HUB_NAME, *PUSB_ROOT_HUB_NAME; 
        [StructLayout(LayoutKind.Sequential, CharSet = CharSet.Auto)]
        struct USB_ROOT_HUB_NAME
        {
            public int ActualLength;
            [MarshalAs(UnmanagedType.ByValTStr, SizeConst = BUFFER_SIZE)]
            public string RootHubName;
        }

        //typedef struct _USB_HUB_DESCRIPTOR { 
        //    UCHAR  bDescriptorLength; 
        //    UCHAR  bDescriptorType; 
        //    UCHAR  bNumberOfPorts; 
        //    USHORT  wHubCharacteristics; 
        //    UCHAR  bPowerOnToPowerGood; 
        //    UCHAR  bHubControlCurrent; 
        //    UCHAR  bRemoveAndPowerMask[64]; 
        //} USB_HUB_DESCRIPTOR, *PUSB_HUB_DESCRIPTOR; 
        [StructLayout(LayoutKind.Sequential, Pack = 1)]
        struct USB_HUB_DESCRIPTOR
        {
            public byte bDescriptorLength;
            public byte bDescriptorType;
            public byte bNumberOfPorts;
            public short wHubCharacteristics;
            public byte bPowerOnToPowerGood;
            public byte bHubControlCurrent;
            [MarshalAs(UnmanagedType.ByValArray, SizeConst = 64)]
            public byte[] bRemoveAndPowerMask;
        }

        //typedef struct _USB_HUB_INFORMATION { 
        //    USB_HUB_DESCRIPTOR HubDescriptor; 
        //    BOOLEAN HubIsBusPowered; 
        //} USB_HUB_INFORMATION, *PUSB_HUB_INFORMATION; 
        [StructLayout(LayoutKind.Sequential)]
        struct USB_HUB_INFORMATION
        {
            public USB_HUB_DESCRIPTOR HubDescriptor;
            public byte HubIsBusPowered;
        }

        //typedef struct _USB_NODE_INFORMATION { 
        //    USB_HUB_NODE  NodeType; 
        //    union { 
        //        USB_HUB_INFORMATION  HubInformation; 
        //        USB_MI_PARENT_INFORMATION  MiParentInformation; 
        //    } u; 
        //} USB_NODE_INFORMATION, *PUSB_NODE_INFORMATION; 
        [StructLayout(LayoutKind.Sequential)]
        struct USB_NODE_INFORMATION
        {
            public int NodeType;
            public USB_HUB_INFORMATION HubInformation;          // Yeah, I'm assuming we'll just use the first form 
        }

        //typedef struct _USB_NODE_CONNECTION_INFORMATION_EX { 
        //    ULONG  ConnectionIndex; 
        //    USB_DEVICE_DESCRIPTOR  DeviceDescriptor; 
        //    UCHAR  CurrentConfigurationValue; 
        //    UCHAR  Speed; 
        //    BOOLEAN  DeviceIsHub; 
        //    USHORT  DeviceAddress; 
        //    ULONG  NumberOfOpenPipes; 
        //    USB_CONNECTION_STATUS  ConnectionStatus; 
        //    USB_PIPE_INFO  PipeList[0]; 
        //} USB_NODE_CONNECTION_INFORMATION_EX, *PUSB_NODE_CONNECTION_INFORMATION_EX; 
        [StructLayout(LayoutKind.Sequential, Pack = 1)]
        struct USB_NODE_CONNECTION_INFORMATION_EX
        {
            public int ConnectionIndex;
            public USB_DEVICE_DESCRIPTOR DeviceDescriptor;
            public byte CurrentConfigurationValue;
            public byte Speed;
            public byte DeviceIsHub;
            public short DeviceAddress;
            public int NumberOfOpenPipes;
            public int ConnectionStatus;
            //public IntPtr PipeList; 
        }

        //typedef struct _USB_DEVICE_DESCRIPTOR { 
        //    UCHAR  bLength; 
        //    UCHAR  bDescriptorType; 
        //    USHORT  bcdUSB; 
        //    UCHAR  bDeviceClass; 
        //    UCHAR  bDeviceSubClass; 
        //    UCHAR  bDeviceProtocol; 
        //    UCHAR  bMaxPacketSize0; 
        //    USHORT  idVendor; 
        //    USHORT  idProduct; 
        //    USHORT  bcdDevice; 
        //    UCHAR  iManufacturer; 
        //    UCHAR  iProduct; 
        //    UCHAR  iSerialNumber; 
        //    UCHAR  bNumConfigurations; 
        //} USB_DEVICE_DESCRIPTOR, *PUSB_DEVICE_DESCRIPTOR ; 
        [StructLayout(LayoutKind.Sequential, Pack = 1)]
        internal struct USB_DEVICE_DESCRIPTOR
        {
            public byte bLength;
            public byte bDescriptorType;
            public short bcdUSB;
            public byte bDeviceClass;
            public byte bDeviceSubClass;
            public byte bDeviceProtocol;
            public byte bMaxPacketSize0;
            public short idVendor;
            public short idProduct;
            public short bcdDevice;
            public byte iManufacturer;
            public byte iProduct;
            public byte iSerialNumber;
            public byte bNumConfigurations;
        }

        //typedef struct _USB_STRING_DESCRIPTOR { 
        //    UCHAR bLength; 
        //    UCHAR bDescriptorType; 
        //    WCHAR bString[1]; 
        //} USB_STRING_DESCRIPTOR, *PUSB_STRING_DESCRIPTOR; 
        [StructLayout(LayoutKind.Sequential, CharSet = CharSet.Auto)]
        struct USB_STRING_DESCRIPTOR
        {
            public byte bLength;
            public byte bDescriptorType;
            [MarshalAs(UnmanagedType.ByValTStr, SizeConst = MAXIMUM_USB_STRING_LENGTH)]
            public string bString;
        }

        //typedef struct _USB_DESCRIPTOR_REQUEST { 
        //  ULONG ConnectionIndex; 
        //  struct { 
        //    UCHAR  bmRequest; 
        //    UCHAR  bRequest; 
        //    USHORT  wValue; 
        //    USHORT  wIndex; 
        //    USHORT  wLength; 
        //  } SetupPacket; 
        //  UCHAR  Data[0]; 
        //} USB_DESCRIPTOR_REQUEST, *PUSB_DESCRIPTOR_REQUEST 
        [StructLayout(LayoutKind.Sequential)]
        struct USB_SETUP_PACKET
        {
            public byte bmRequest;
            public byte bRequest;
            public short wValue;
            public short wIndex;
            public short wLength;
        }
        [StructLayout(LayoutKind.Sequential)]
        struct USB_DESCRIPTOR_REQUEST
        {
            public int ConnectionIndex;
            public USB_SETUP_PACKET SetupPacket;
            //public byte[] Data; 
        }

        //typedef struct _USB_NODE_CONNECTION_NAME { 
        //    ULONG  ConnectionIndex; 
        //    ULONG  ActualLength; 
        //    WCHAR  NodeName[1]; 
        //} USB_NODE_CONNECTION_NAME, *PUSB_NODE_CONNECTION_NAME; 
        [StructLayout(LayoutKind.Sequential, CharSet = CharSet.Auto)]
        struct USB_NODE_CONNECTION_NAME
        {
            public int ConnectionIndex;
            public int ActualLength;
            [MarshalAs(UnmanagedType.ByValTStr, SizeConst = BUFFER_SIZE)]
            public string NodeName;
        }

        //typedef struct _USB_NODE_CONNECTION_DRIVERKEY_NAME { 
        //    ULONG  ConnectionIndex; 
        //    ULONG  ActualLength; 
        //    WCHAR  DriverKeyName[1]; 
        //} USB_NODE_CONNECTION_DRIVERKEY_NAME, *PUSB_NODE_CONNECTION_DRIVERKEY_NAME; 
        [StructLayout(LayoutKind.Sequential, CharSet = CharSet.Auto)]
        struct USB_NODE_CONNECTION_DRIVERKEY_NAME               // Yes, this is the same as the structure above... 
        {
            public int ConnectionIndex;
            public int ActualLength;
            [MarshalAs(UnmanagedType.ByValTStr, SizeConst = BUFFER_SIZE)]
            public string DriverKeyName;
        }

        #endregion

        #region API Definitions

        //HDEVINFO SetupDiGetClassDevs( 
        //  const GUID* ClassGuid, 
        //  PCTSTR Enumerator, 
        //  HWND hwndParent, 
        //  DWORD Flags 
        //); 
        [DllImport("setupapi.dll", CharSet = CharSet.Auto)]
        static extern IntPtr SetupDiGetClassDevs(               // 1st form using a ClassGUID 
            ref Guid ClassGuid,
            int Enumerator,
            IntPtr hwndParent,
            int Flags
        );
        [DllImport("setupapi.dll", CharSet = CharSet.Auto)]     // 2nd form uses an Enumerator 
        static extern IntPtr SetupDiGetClassDevs(
            int ClassGuid,
            string Enumerator,
            IntPtr hwndParent,
            int Flags
        );

        //BOOL SetupDiEnumDeviceInterfaces( 
        //  HDEVINFO DeviceInfoSet, 
        //  PSP_DEVINFO_DATA DeviceInfoData, 
        //  const GUID* InterfaceClassGuid, 
        //  DWORD MemberIndex, 
        //  PSP_DEVICE_INTERFACE_DATA DeviceInterfaceData 
        //); 
        [DllImport("setupapi.dll", SetLastError = true, CharSet = CharSet.Auto)]
        static extern bool SetupDiEnumDeviceInterfaces(
            IntPtr DeviceInfoSet,
            IntPtr DeviceInfoData,
            ref Guid InterfaceClassGuid,
            int MemberIndex,
            ref SP_DEVICE_INTERFACE_DATA DeviceInterfaceData
        );

        //BOOL SetupDiGetDeviceInterfaceDetail( 
        //  HDEVINFO DeviceInfoSet, 
        //  PSP_DEVICE_INTERFACE_DATA DeviceInterfaceData, 
        //  PSP_DEVICE_INTERFACE_DETAIL_DATA DeviceInterfaceDetailData, 
        //  DWORD DeviceInterfaceDetailDataSize, 
        //  PDWORD RequiredSize, 
        //  PSP_DEVINFO_DATA DeviceInfoData 
        //); 
        [DllImport("setupapi.dll", SetLastError = true, CharSet = CharSet.Auto)]
        static extern bool SetupDiGetDeviceInterfaceDetail(
            IntPtr DeviceInfoSet,
            ref SP_DEVICE_INTERFACE_DATA DeviceInterfaceData,
            ref SP_DEVICE_INTERFACE_DETAIL_DATA DeviceInterfaceDetailData,
            int DeviceInterfaceDetailDataSize,
            ref int RequiredSize,
            ref SP_DEVINFO_DATA DeviceInfoData
        );

        //BOOL SetupDiGetDeviceRegistryProperty( 
        //  HDEVINFO DeviceInfoSet, 
        //  PSP_DEVINFO_DATA DeviceInfoData, 
        //  DWORD Property, 
        //  PDWORD PropertyRegDataType, 
        //  PBYTE PropertyBuffer, 
        //  DWORD PropertyBufferSize, 
        //  PDWORD RequiredSize 
        //); 
        [DllImport("setupapi.dll", SetLastError = true, CharSet = CharSet.Auto)]
        static extern bool SetupDiGetDeviceRegistryProperty(
            IntPtr DeviceInfoSet,
            ref SP_DEVINFO_DATA DeviceInfoData,
            int iProperty,
            ref int PropertyRegDataType,
            IntPtr PropertyBuffer,
            int PropertyBufferSize,
            ref int RequiredSize
        );

        //BOOL SetupDiEnumDeviceInfo( 
        //  HDEVINFO DeviceInfoSet, 
        //  DWORD MemberIndex, 
        //  PSP_DEVINFO_DATA DeviceInfoData 
        //); 
        [DllImport("setupapi.dll", SetLastError = true, CharSet = CharSet.Auto)]
        static extern bool SetupDiEnumDeviceInfo(
            IntPtr DeviceInfoSet,
            int MemberIndex,
            ref SP_DEVINFO_DATA DeviceInfoData
        );

        //BOOL SetupDiDestroyDeviceInfoList( 
        //  HDEVINFO DeviceInfoSet 
        //); 
        [DllImport("setupapi.dll", SetLastError = true)]
        static extern bool SetupDiDestroyDeviceInfoList(
            IntPtr DeviceInfoSet
        );

        //WINSETUPAPI BOOL WINAPI  SetupDiGetDeviceInstanceId( 
        //    IN HDEVINFO  DeviceInfoSet, 
        //    IN PSP_DEVINFO_DATA  DeviceInfoData, 
        //    OUT PTSTR  DeviceInstanceId, 
        //    IN DWORD  DeviceInstanceIdSize, 
        //    OUT PDWORD  RequiredSize  OPTIONAL 
        //); 
        [DllImport("setupapi.dll", SetLastError = true, CharSet = CharSet.Auto)]
        static extern bool SetupDiGetDeviceInstanceId(
            IntPtr DeviceInfoSet,
            ref SP_DEVINFO_DATA DeviceInfoData,
            StringBuilder DeviceInstanceId,
            int DeviceInstanceIdSize,
            out int RequiredSize
        );

        //BOOL DeviceIoControl( 
        //  HANDLE hDevice, 
        //  DWORD dwIoControlCode, 
        //  LPVOID lpInBuffer, 
        //  DWORD nInBufferSize, 
        //  LPVOID lpOutBuffer, 
        //  DWORD nOutBufferSize, 
        //  LPDWORD lpBytesReturned, 
        //  LPOVERLAPPED lpOverlapped 
        //); 
        [DllImport("kernel32.dll", SetLastError = true, CharSet = CharSet.Auto)]
        static extern bool DeviceIoControl(
            IntPtr hDevice,
            int dwIoControlCode,
            IntPtr lpInBuffer,
            int nInBufferSize,
            IntPtr lpOutBuffer,
            int nOutBufferSize,
            out int lpBytesReturned,
            IntPtr lpOverlapped
        );

        //HANDLE CreateFile( 
        //  LPCTSTR lpFileName, 
        //  DWORD dwDesiredAccess, 
        //  DWORD dwShareMode, 
        //  LPSECURITY_ATTRIBUTES lpSecurityAttributes, 
        //  DWORD dwCreationDisposition, 
        //  DWORD dwFlagsAndAttributes, 
        //  HANDLE hTemplateFile 
        //); 
        [DllImport("kernel32.dll", SetLastError = true, CharSet = CharSet.Auto)]
        static extern IntPtr CreateFile(
           string lpFileName,
           int dwDesiredAccess,
           int dwShareMode,
           IntPtr lpSecurityAttributes,
           int dwCreationDisposition,
           int dwFlagsAndAttributes,
           IntPtr hTemplateFile
        );

        //BOOL CloseHandle( 
        //  HANDLE hObject 
        //); 
        [DllImport("kernel32.dll", SetLastError = true, CharSet = CharSet.Auto)]
        static extern bool CloseHandle(
            IntPtr hObject
        );

        #endregion

        #endregion

        #region Get Host Controllers

        public static ReadOnlyCollection<USBController> GetHostControllers()
        {
            var HostList = new List<USBController>();
            var HostGUID = new Guid(GUID_DEVINTERFACE_COMPORT);

            // We start at the "root" of the device tree and look for all 
            // devices that match the interface GUID of a Hub Controller 
            var h = SetupDiGetClassDevs(ref HostGUID, 0, IntPtr.Zero, DIGCF_PRESENT | DIGCF_DEVICEINTERFACE);
            if (h.ToInt32() == INVALID_HANDLE_VALUE)
                return new ReadOnlyCollection<USBController>(HostList);

            var ptrBuf = Marshal.AllocHGlobal(BUFFER_SIZE);
            bool Success;
            var i = 0;
            do
            {
                var host = new USBController { ControllerIndex = i };

                // create a Device Interface Data structure 
                var dia = new SP_DEVICE_INTERFACE_DATA();
                dia.cbSize = Marshal.SizeOf(dia);

                // start the enumeration  
                Success = SetupDiEnumDeviceInterfaces(h, IntPtr.Zero, ref HostGUID, i, ref dia);
                if (Success)
                {
                    // build a DevInfo Data structure 
                    var da = new SP_DEVINFO_DATA();
                    da.cbSize = Marshal.SizeOf(da);

                    // build a Device Interface Detail Data structure 
                    var didd = new SP_DEVICE_INTERFACE_DETAIL_DATA { cbSize = 4 + Marshal.SystemDefaultCharSize };

                    // now we can get some more detailed information 
                    var nRequiredSize = 0;
                    const int nBytes = BUFFER_SIZE;
                    if (SetupDiGetDeviceInterfaceDetail(h, ref dia, ref didd, nBytes, ref nRequiredSize, ref da))
                    {
                        host.ControllerDevicePath = didd.DevicePath;

                        // get the Device Description and DriverKeyName 
                        var RequiredSize = 0;
                        var RegType = REG_SZ;

                        if (SetupDiGetDeviceRegistryProperty(h, ref da, SPDRP_DEVICEDESC, ref RegType, ptrBuf, BUFFER_SIZE, ref RequiredSize))
                        {
                            host.ControllerDeviceDesc = Marshal.PtrToStringAuto(ptrBuf);
                        }
                        if (SetupDiGetDeviceRegistryProperty(h, ref da, SPDRP_DRIVER, ref RegType, ptrBuf, BUFFER_SIZE, ref RequiredSize))
                        {
                            host.ControllerDriverKeyName = Marshal.PtrToStringAuto(ptrBuf);
                        }
                    }
                    HostList.Add(host);
                }
                i++;
            } while (Success);

            Marshal.FreeHGlobal(ptrBuf);
            SetupDiDestroyDeviceInfoList(h);

            // convert it into a Collection 
            return new ReadOnlyCollection<USBController>(HostList);
        }

        #endregion

        #region USB Controller

        public class USBController
        {
            #region Fields

            internal int ControllerIndex;
            internal string ControllerDriverKeyName, ControllerDevicePath, ControllerDeviceDesc;

            #endregion

            #region Constructor

            public USBController()
            {
                ControllerIndex = 0;
                ControllerDevicePath = "";
                ControllerDeviceDesc = "";
                ControllerDriverKeyName = "";
            }

            #endregion

            #region Properties
            // Return the index of the instance 
            public int Index
            {
                get { return ControllerIndex; }
            }

            // Return the Device Path, such as "\\?\pci#ven_10de&dev_005a&subsys_815a1043&rev_a2#3&267a616a&0&58#{3abf6f2d-71c4-462a-8a92-1e6861e6af27}" 
            public string DevicePath
            {
                get { return ControllerDevicePath; }
            }

            // The DriverKeyName may be useful as a search key 
            public string DriverKeyName
            {
                get { return ControllerDriverKeyName; }
            }

            // Return the Friendly Name, such as "VIA USB Enhanced Host Controller" 
            public string Name
            {
                get { return ControllerDeviceDesc; }
            }

            #endregion

            #region Get Root Hub
            // Return Root Hub for this Controller 
            public USBHub GetRootHub()
            {
                var Root = new USBHub { HubIsRootHub = true, HubDeviceDesc = "Root Hub" };

                // Open a handle to the Host Controller 
                var h = CreateFile(ControllerDevicePath, GENERIC_WRITE, FILE_SHARE_WRITE, IntPtr.Zero, OPEN_EXISTING, 0, IntPtr.Zero);
                if (h.ToInt32() == INVALID_HANDLE_VALUE)
                    return Root;

                int nBytesReturned;
                var HubName = new USB_ROOT_HUB_NAME();
                var nBytes = Marshal.SizeOf(HubName);
                var ptrHubName = Marshal.AllocHGlobal(nBytes);

                // get the Hub Name 
                if (DeviceIoControl(h, IOCTL_USB_GET_ROOT_HUB_NAME, ptrHubName, nBytes, ptrHubName, nBytes, out nBytesReturned, IntPtr.Zero))
                {
                    HubName = (USB_ROOT_HUB_NAME)Marshal.PtrToStructure(ptrHubName, typeof(USB_ROOT_HUB_NAME));
                    Root.HubDevicePath = @"\\.\" + HubName.RootHubName;
                }

                // TODO: Get DriverKeyName for Root Hub 

                // Now let's open the Hub (based upon the HubName we got above) 
                var h2 = CreateFile(Root.HubDevicePath, GENERIC_WRITE, FILE_SHARE_WRITE, IntPtr.Zero, OPEN_EXISTING, 0, IntPtr.Zero);
                if (h2.ToInt32() != INVALID_HANDLE_VALUE)
                {
                    var NodeInfo = new USB_NODE_INFORMATION { NodeType = (int)USB_HUB_NODE.UsbHub };
                    nBytes = Marshal.SizeOf(NodeInfo);
                    var ptrNodeInfo = Marshal.AllocHGlobal(nBytes);
                    Marshal.StructureToPtr(NodeInfo, ptrNodeInfo, true);

                    // get the Hub Information 
                    if (DeviceIoControl(h2, IOCTL_USB_GET_NODE_INFORMATION, ptrNodeInfo, nBytes, ptrNodeInfo, nBytes, out nBytesReturned, IntPtr.Zero))
                    {
                        NodeInfo = (USB_NODE_INFORMATION)Marshal.PtrToStructure(ptrNodeInfo, typeof(USB_NODE_INFORMATION));
                        Root.HubIsBusPowered = Convert.ToBoolean(NodeInfo.HubInformation.HubIsBusPowered);
                        Root.HubPortCount = NodeInfo.HubInformation.HubDescriptor.bNumberOfPorts;
                    }
                    Marshal.FreeHGlobal(ptrNodeInfo);
                    CloseHandle(h2);
                }

                Marshal.FreeHGlobal(ptrHubName);
                CloseHandle(h);
                return Root;
            }

            #endregion
        }

        #endregion

        #region USB Hub

        public class USBHub
        {
            #region Fields

            internal int HubPortCount;
            internal string HubDriverKey, HubDevicePath, HubDeviceDesc;
            internal string HubManufacturer, HubProduct, HubSerialNumber, HubInstanceID;
            internal bool HubIsBusPowered, HubIsRootHub;

            #endregion

            #region Constructor

            public USBHub()
            {
                HubPortCount = 0;
                HubDevicePath = "";
                HubDeviceDesc = "";
                HubDriverKey = "";
                HubIsBusPowered = false;
                HubIsRootHub = false;
                HubManufacturer = "";
                HubProduct = "";
                HubSerialNumber = "";
                HubInstanceID = "";
            }

            #endregion

            #region Properties
            // return Port Count 
            public int PortCount
            {
                get { return HubPortCount; }
            }

            // return the Device Path, such as "\\?\pci#ven_10de&dev_005a&subsys_815a1043&rev_a2#3&267a616a&0&58#{3abf6f2d-71c4-462a-8a92-1e6861e6af27}" 
            public string DevicePath
            {
                get { return HubDevicePath; }
            }

            // The DriverKey may be useful as a search key 
            public string DriverKey
            {
                get { return HubDriverKey; }
            }

            // return the Friendly Name, such as "VIA USB Enhanced Host Controller" 
            public string Name
            {
                get { return HubDeviceDesc; }
            }

            // the device path of this device 
            public string InstanceID
            {
                get { return HubInstanceID; }
            }

            // is is this a self-powered hub? 
            public bool IsBusPowered
            {
                get { return HubIsBusPowered; }
            }

            // is this a root hub? 
            public bool IsRootHub
            {
                get { return HubIsRootHub; }
            }

            public string Manufacturer
            {
                get { return HubManufacturer; }
            }

            public string Product
            {
                get { return HubProduct; }
            }

            public string SerialNumber
            {
                get { return HubSerialNumber; }
            }

            #endregion

            #region Get Ports
            // return a list of the down stream ports 
            public ReadOnlyCollection<USBPort> GetPorts()
            {
                var PortList = new List<USBPort>();

                // Open a handle to the Hub device 
                var h = CreateFile(HubDevicePath, GENERIC_WRITE, FILE_SHARE_WRITE, IntPtr.Zero, OPEN_EXISTING, 0, IntPtr.Zero);
                if (h.ToInt32() == INVALID_HANDLE_VALUE)
                    return new ReadOnlyCollection<USBPort>(PortList);

                var nBytes = Marshal.SizeOf(typeof(USB_NODE_CONNECTION_INFORMATION_EX));
                var ptrNodeConnection = Marshal.AllocHGlobal(nBytes);

                // loop thru all of the ports on the hub 
                // BTW: Ports are numbered starting at 1 
                for (var i = 1; i <= HubPortCount; i++)
                {
                    int nBytesReturned;
                    var NodeConnection = new USB_NODE_CONNECTION_INFORMATION_EX
                    {
                        ConnectionIndex = i
                    };
                    Marshal.StructureToPtr(NodeConnection, ptrNodeConnection, true);

                    if (!DeviceIoControl(h, IOCTL_USB_GET_NODE_CONNECTION_INFORMATION_EX, ptrNodeConnection, nBytes,
                            ptrNodeConnection, nBytes, out nBytesReturned, IntPtr.Zero)) continue;

                    NodeConnection = (USB_NODE_CONNECTION_INFORMATION_EX)Marshal.PtrToStructure(ptrNodeConnection, typeof(USB_NODE_CONNECTION_INFORMATION_EX));

                    // load up the USBPort class 
                    var Status = (USB_CONNECTION_STATUS)NodeConnection.ConnectionStatus;
                    var Speed = (USB_DEVICE_SPEED)NodeConnection.Speed;
                    var port = new USBPort
                    {
                        PortPortNumber = i,
                        PortHubDevicePath = HubDevicePath,
                        PortStatus = Status.ToString(),
                        PortSpeed = Speed.ToString(),
                        PortIsDeviceConnected =
                            (NodeConnection.ConnectionStatus == (int)USB_CONNECTION_STATUS.DeviceConnected),
                        PortIsHub = Convert.ToBoolean(NodeConnection.DeviceIsHub),
                        PortDeviceDescriptor = NodeConnection.DeviceDescriptor
                    };

                    // add it to the list 
                    PortList.Add(port);
                }
                Marshal.FreeHGlobal(ptrNodeConnection);
                CloseHandle(h);
                // convert it into a Collection 
                return new ReadOnlyCollection<USBPort>(PortList);
            }

            #endregion

        }

        #endregion

        #region USB Port

        public class USBPort
        {
            #region Fields

            internal int PortPortNumber;
            internal string PortStatus, PortHubDevicePath, PortSpeed;
            internal bool PortIsHub, PortIsDeviceConnected;
            internal USB_DEVICE_DESCRIPTOR PortDeviceDescriptor;

            #endregion

            #region Constructor

            public USBPort()
            {
                PortPortNumber = 0;
                PortStatus = "";
                PortHubDevicePath = "";
                PortSpeed = "";
                PortIsHub = false;
                PortIsDeviceConnected = false;
            }

            #endregion

            #region Properties

            // return Port Index of the Hub 
            public int PortNumber
            {
                get { return PortPortNumber; }
            }

            // return the Device Path of the Hub 
            public string HubDevicePath
            {
                get { return PortHubDevicePath; }
            }

            // the status (see USB_CONNECTION_STATUS above) 
            public string Status
            {
                get { return PortStatus; }
            }

            // the speed of the connection (see USB_DEVICE_SPEED above) 
            public string Speed
            {
                get { return PortSpeed; }
            }

            // is this a downstream external hub? 
            public bool IsHub
            {
                get { return PortIsHub; }
            }

            // is anybody home? 
            public bool IsDeviceConnected
            {
                get { return PortIsDeviceConnected; }
            }

            #endregion

            #region Get Device

            // return a down stream external hub 
            public USBDevice GetDevice()
            {
                if (!PortIsDeviceConnected)
                    return null;

                // Copy over some values from the Port class 
                // Ya know, I've given some thought about making Device a derived class... 
                var Device = new USBDevice
                {
                    DevicePortNumber = PortPortNumber,
                    DeviceHubDevicePath = PortHubDevicePath,
                    DeviceDescriptor = PortDeviceDescriptor
                };

                // Open a handle to the Hub device 
                var h = CreateFile(PortHubDevicePath, GENERIC_WRITE, FILE_SHARE_WRITE, IntPtr.Zero, OPEN_EXISTING, 0, IntPtr.Zero);
                if (h.ToInt32() == INVALID_HANDLE_VALUE)
                    return Device;

                int nBytesReturned;
                var nBytes = BUFFER_SIZE;
                // We use this to zero fill a buffer 
                var NullString = new string((char)0, BUFFER_SIZE / Marshal.SystemDefaultCharSize);

                // The iManufacturer, iProduct and iSerialNumber entries in the 
                // Device Descriptor are really just indexes.  So, we have to  
                // request a String Descriptor to get the values for those strings. 

                if (PortDeviceDescriptor.iManufacturer > 0)
                {
                    // build a request for string descriptor 
                    var Request = new USB_DESCRIPTOR_REQUEST
                    {
                        ConnectionIndex = PortPortNumber,
                        SetupPacket =
                        {
                            wValue =
                                (short)((USB_STRING_DESCRIPTOR_TYPE << 8) + PortDeviceDescriptor.iManufacturer)
                        }
                    };
                    Request.SetupPacket.wLength = (short)(nBytes - Marshal.SizeOf(Request));
                    Request.SetupPacket.wIndex = 0x409; // Language Code 
                    // Geez, I wish C# had a Marshal.MemSet() method 
                    var ptrRequest = Marshal.StringToHGlobalAuto(NullString);
                    Marshal.StructureToPtr(Request, ptrRequest, true);

                    // Use an IOCTL call to request the String Descriptor 
                    if (DeviceIoControl(h, IOCTL_USB_GET_DESCRIPTOR_FROM_NODE_CONNECTION, ptrRequest, nBytes, ptrRequest, nBytes, out nBytesReturned, IntPtr.Zero))
                    {
                        // The location of the string descriptor is immediately after 
                        // the Request structure.  Because this location is not "covered" 
                        // by the structure allocation, we're forced to zero out this 
                        // chunk of memory by using the StringToHGlobalAuto() hack above 
                        var ptrStringDesc = new IntPtr(ptrRequest.ToInt32() + Marshal.SizeOf(Request));
                        var StringDesc = (USB_STRING_DESCRIPTOR)Marshal.PtrToStructure(ptrStringDesc, typeof(USB_STRING_DESCRIPTOR));
                        Device.DeviceManufacturer = StringDesc.bString;
                    }
                    Marshal.FreeHGlobal(ptrRequest);
                }
                if (PortDeviceDescriptor.iProduct > 0)
                {
                    // build a request for string descriptor 
                    var Request = new USB_DESCRIPTOR_REQUEST
                    {
                        ConnectionIndex = PortPortNumber,
                        SetupPacket =
                        {
                            wValue = (short)((USB_STRING_DESCRIPTOR_TYPE << 8) + PortDeviceDescriptor.iProduct)
                        }
                    };
                    Request.SetupPacket.wLength = (short)(nBytes - Marshal.SizeOf(Request));
                    Request.SetupPacket.wIndex = 0x409; // Language Code 
                    // Geez, I wish C# had a Marshal.MemSet() method 
                    var ptrRequest = Marshal.StringToHGlobalAuto(NullString);
                    Marshal.StructureToPtr(Request, ptrRequest, true);

                    // Use an IOCTL call to request the String Descriptor 
                    if (DeviceIoControl(h, IOCTL_USB_GET_DESCRIPTOR_FROM_NODE_CONNECTION, ptrRequest, nBytes, ptrRequest, nBytes, out nBytesReturned, IntPtr.Zero))
                    {
                        // the location of the string descriptor is immediately after the Request structure 
                        var ptrStringDesc = new IntPtr(ptrRequest.ToInt32() + Marshal.SizeOf(Request));
                        var StringDesc = (USB_STRING_DESCRIPTOR)Marshal.PtrToStructure(ptrStringDesc, typeof(USB_STRING_DESCRIPTOR));
                        Device.DeviceProduct = StringDesc.bString;
                    }
                    Marshal.FreeHGlobal(ptrRequest);
                }
                if (PortDeviceDescriptor.iSerialNumber > 0)
                {
                    // build a request for string descriptor 
                    var Request = new USB_DESCRIPTOR_REQUEST
                    {
                        ConnectionIndex = PortPortNumber,
                        SetupPacket =
                        {
                            wValue =
                                (short)((USB_STRING_DESCRIPTOR_TYPE << 8) + PortDeviceDescriptor.iSerialNumber)
                        }
                    };
                    Request.SetupPacket.wLength = (short)(nBytes - Marshal.SizeOf(Request));
                    Request.SetupPacket.wIndex = 0x409; // Language Code 
                    // Geez, I wish C# had a Marshal.MemSet() method 
                    var ptrRequest = Marshal.StringToHGlobalAuto(NullString);
                    Marshal.StructureToPtr(Request, ptrRequest, true);

                    // Use an IOCTL call to request the String Descriptor 
                    if (DeviceIoControl(h, IOCTL_USB_GET_DESCRIPTOR_FROM_NODE_CONNECTION, ptrRequest, nBytes, ptrRequest, nBytes, out nBytesReturned, IntPtr.Zero))
                    {
                        // the location of the string descriptor is immediately after the Request structure 
                        var ptrStringDesc = new IntPtr(ptrRequest.ToInt32() + Marshal.SizeOf(Request));
                        var StringDesc = (USB_STRING_DESCRIPTOR)Marshal.PtrToStructure(ptrStringDesc, typeof(USB_STRING_DESCRIPTOR));
                        Device.DeviceSerialNumber = StringDesc.bString;
                    }
                    Marshal.FreeHGlobal(ptrRequest);
                }

                // Get the Driver Key Name (usefull in locating a device) 
                var DriverKey = new USB_NODE_CONNECTION_DRIVERKEY_NAME { ConnectionIndex = PortPortNumber };
                nBytes = Marshal.SizeOf(DriverKey);
                var ptrDriverKey = Marshal.AllocHGlobal(nBytes);
                Marshal.StructureToPtr(DriverKey, ptrDriverKey, true);

                // Use an IOCTL call to request the Driver Key Name 
                if (DeviceIoControl(h, IOCTL_USB_GET_NODE_CONNECTION_DRIVERKEY_NAME, ptrDriverKey, nBytes, ptrDriverKey, nBytes, out nBytesReturned, IntPtr.Zero))
                {
                    DriverKey = (USB_NODE_CONNECTION_DRIVERKEY_NAME)Marshal.PtrToStructure(ptrDriverKey, typeof(USB_NODE_CONNECTION_DRIVERKEY_NAME));
                    Device.DeviceDriverKey = DriverKey.DriverKeyName;

                    // use the DriverKeyName to get the Device Description and Instance ID 
                    Device.DeviceName = GetDescriptionByKeyName(Device.DeviceDriverKey);
                    Device.DeviceInstanceID = GetInstanceIDByKeyName(Device.DeviceDriverKey);
                }
                Marshal.FreeHGlobal(ptrDriverKey);
                CloseHandle(h);
                return Device;
            }

            #endregion

            #region Get Hub
            // return a down stream external hub 
            public USBHub GetHub()
            {
                if (!PortIsHub)
                    return null;

                var Hub = new USBHub { HubIsRootHub = false, HubDeviceDesc = "External Hub" };

                // Open a handle to the Host Controller 
                var h = CreateFile(PortHubDevicePath, GENERIC_WRITE, FILE_SHARE_WRITE, IntPtr.Zero, OPEN_EXISTING, 0, IntPtr.Zero);
                if (h.ToInt32() == INVALID_HANDLE_VALUE)
                    return Hub;

                // Get the DevicePath for downstream hub 
                int nBytesReturned;
                var NodeName = new USB_NODE_CONNECTION_NAME { ConnectionIndex = PortPortNumber };
                var nBytes = Marshal.SizeOf(NodeName);
                var ptrNodeName = Marshal.AllocHGlobal(nBytes);
                Marshal.StructureToPtr(NodeName, ptrNodeName, true);

                // Use an IOCTL call to request the Node Name 
                if (DeviceIoControl(h, IOCTL_USB_GET_NODE_CONNECTION_NAME, ptrNodeName, nBytes, ptrNodeName, nBytes, out nBytesReturned, IntPtr.Zero))
                {
                    NodeName = (USB_NODE_CONNECTION_NAME)Marshal.PtrToStructure(ptrNodeName, typeof(USB_NODE_CONNECTION_NAME));
                    Hub.HubDevicePath = @"\\.\" + NodeName.NodeName;
                }

                // Now let's open the Hub (based upon the HubName we got above) 
                var h2 = CreateFile(Hub.HubDevicePath, GENERIC_WRITE, FILE_SHARE_WRITE, IntPtr.Zero, OPEN_EXISTING, 0, IntPtr.Zero);
                if (h2.ToInt32() != INVALID_HANDLE_VALUE)
                {
                    var NodeInfo = new USB_NODE_INFORMATION { NodeType = (int)USB_HUB_NODE.UsbHub };
                    nBytes = Marshal.SizeOf(NodeInfo);
                    var ptrNodeInfo = Marshal.AllocHGlobal(nBytes);
                    Marshal.StructureToPtr(NodeInfo, ptrNodeInfo, true);

                    // get the Hub Information 
                    if (DeviceIoControl(h2, IOCTL_USB_GET_NODE_INFORMATION, ptrNodeInfo, nBytes, ptrNodeInfo, nBytes, out nBytesReturned, IntPtr.Zero))
                    {
                        NodeInfo = (USB_NODE_INFORMATION)Marshal.PtrToStructure(ptrNodeInfo, typeof(USB_NODE_INFORMATION));
                        Hub.HubIsBusPowered = Convert.ToBoolean(NodeInfo.HubInformation.HubIsBusPowered);
                        Hub.HubPortCount = NodeInfo.HubInformation.HubDescriptor.bNumberOfPorts;
                    }
                    Marshal.FreeHGlobal(ptrNodeInfo);
                    CloseHandle(h2);
                }

                // Fill in the missing Manufacture, Product, and SerialNumber values 
                // values by just creating a Device instance and copying the values 
                var Device = GetDevice();
                Hub.HubInstanceID = Device.DeviceInstanceID;
                Hub.HubManufacturer = Device.Manufacturer;
                Hub.HubProduct = Device.Product;
                Hub.HubSerialNumber = Device.SerialNumber;
                Hub.HubDriverKey = Device.DriverKey;

                Marshal.FreeHGlobal(ptrNodeName);
                CloseHandle(h);
                return Hub;
            }

            #endregion
        }

        #endregion

        #region USB Device

        public class USBDevice
        {
            #region Fields

            internal int DevicePortNumber;
            internal string DeviceDriverKey, DeviceHubDevicePath, DeviceInstanceID, DeviceName;
            internal string DeviceManufacturer, DeviceProduct, DeviceSerialNumber;
            internal USB_DEVICE_DESCRIPTOR DeviceDescriptor;

            #endregion

            #region Constructor

            public USBDevice()
            {
                DevicePortNumber = 0;
                DeviceHubDevicePath = "";
                DeviceDriverKey = "";
                DeviceManufacturer = "";
                DeviceProduct = "Unknown USB Device";
                DeviceSerialNumber = "";
                DeviceName = "";
                DeviceInstanceID = "";
            }

            #endregion

            #region Properties
            // return Port Index of the Hub 
            public int PortNumber
            {
                get { return DevicePortNumber; }
            }

            // return the Device Path of the Hub (the parent device) 
            public string HubDevicePath
            {
                get { return DeviceHubDevicePath; }
            }

            // useful as a search key 
            public string DriverKey
            {
                get { return DeviceDriverKey; }
            }

            // the device path of this device 
            public string InstanceID
            {
                get { return DeviceInstanceID; }
            }

            // the friendly name 
            public string Name
            {
                get { return DeviceName; }
            }

            public string Manufacturer
            {
                get { return DeviceManufacturer; }
            }

            public string Product
            {
                get { return DeviceProduct; }
            }

            public string SerialNumber
            {
                get { return DeviceSerialNumber; }
            }

            #endregion
        }

        #endregion

        #region Get Description By KeyName

        public static string GetDescriptionByKeyName(string DriverKeyName)
        {
            const string DevEnum = REGSTR_KEY_COM;

            // Use the "enumerator form" of the SetupDiGetClassDevs API  
            // to generate a list of all USB devices 
            var h = SetupDiGetClassDevs(0, DevEnum, IntPtr.Zero, DIGCF_PRESENT | DIGCF_ALLCLASSES);
            if (h.ToInt32() == INVALID_HANDLE_VALUE)
                return "";

            var ptrBuf = Marshal.AllocHGlobal(BUFFER_SIZE);

            bool Success;
            var i = 0;
            var ans = "";
            do
            {
                // create a Device Interface Data structure 
                var da = new SP_DEVINFO_DATA();
                da.cbSize = Marshal.SizeOf(da);

                // start the enumeration  
                Success = SetupDiEnumDeviceInfo(h, i, ref da);
                if (Success)
                {
                    var RequiredSize = 0;
                    var RegType = REG_SZ;
                    var KeyName = "";

                    if (SetupDiGetDeviceRegistryProperty(h, ref da, SPDRP_DRIVER, ref RegType, ptrBuf, BUFFER_SIZE, ref RequiredSize))
                    {
                        KeyName = Marshal.PtrToStringAuto(ptrBuf);
                    }

                    // is it a match? 
                    if (KeyName == DriverKeyName)
                    {
                        if (SetupDiGetDeviceRegistryProperty(h, ref da, SPDRP_DEVICEDESC, ref RegType, ptrBuf, BUFFER_SIZE, ref RequiredSize))
                        {
                            ans = Marshal.PtrToStringAuto(ptrBuf);
                        }
                        break;
                    }
                }
                i++;
            } while (Success);

            Marshal.FreeHGlobal(ptrBuf);
            SetupDiDestroyDeviceInfoList(h);
            return ans;
        }

        #endregion

        #region Get InstanceID By KeyName

        public static string GetInstanceIDByKeyName(string DriverKeyName)
        {
            const string DevEnum = REGSTR_KEY_COM;

            // Use the "enumerator form" of the SetupDiGetClassDevs API  
            // to generate a list of all USB devices 
            var h = SetupDiGetClassDevs(0, DevEnum, IntPtr.Zero, DIGCF_PRESENT | DIGCF_ALLCLASSES);
            if (h.ToInt32() == INVALID_HANDLE_VALUE)
                return "";

            var ans = "";
            var ptrBuf = Marshal.AllocHGlobal(BUFFER_SIZE);

            bool Success;
            var i = 0;
            do
            {
                // create a Device Interface Data structure 
                var da = new SP_DEVINFO_DATA();
                da.cbSize = Marshal.SizeOf(da);

                // start the enumeration  
                Success = SetupDiEnumDeviceInfo(h, i, ref da);
                if (Success)
                {
                    var RequiredSize = 0;
                    var RegType = REG_SZ;

                    var KeyName = "";
                    if (SetupDiGetDeviceRegistryProperty(h, ref da, SPDRP_DRIVER, ref RegType, ptrBuf, BUFFER_SIZE, ref RequiredSize))
                    {
                        KeyName = Marshal.PtrToStringAuto(ptrBuf);
                    }

                    // is it a match? 
                    if (KeyName == DriverKeyName)
                    {
                        const int nBytes = BUFFER_SIZE;
                        var sb = new StringBuilder(nBytes);
                        SetupDiGetDeviceInstanceId(h, ref da, sb, nBytes, out RequiredSize);
                        ans = sb.ToString();
                        break;
                    }
                }
                i++;
            } while (Success);

            Marshal.FreeHGlobal(ptrBuf);
            SetupDiDestroyDeviceInfoList(h);
            return ans;
        }

        #endregion

    }
}
