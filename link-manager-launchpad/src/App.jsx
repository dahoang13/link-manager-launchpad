import React, { useState, useEffect } from 'react';
import { 
  Rocket, ExternalLink, AlertTriangle, Plus, Trash2, 
  Folder, Link as LinkIcon, AppWindow, SquareMenu, Settings2, Copy, Check,
  FileText, ClipboardCopy, Type, Edit2, Search, Youtube, Languages
} from 'lucide-react';

const defaultLearningLinks = [
  { id: '1', name: "Vocab Quick Test", url: "https://gemini.google.com/share/721fbc984110", type: 'link' },
  { id: '2', name: "Grammar Test", url: "https://gemini.google.com/share/5da0702a4509", type: 'link' },
  { id: '3', name: "Create Grammar Lessons", url: "https://gemini.google.com/share/d4c8b7a9680b", type: 'link' },
  { id: '4', name: "English Test Generator", url: "https://gemini.google.com/share/aa36d1055a93", type: 'link' },
  { id: '5', name: "Structure & Phrase Practice", url: "https://gemini.google.com/share/2cddbbb886a0", type: 'link' },
  { id: '6', name: "VocabQuizzer.AI", url: "https://gemini.google.com/share/779f0fa4f271", type: 'link' },
  { id: '7', name: "Phonetic Ear", url: "https://gemini.google.com/share/508fd1e172cf", type: 'link' },
  { id: '12', name: "English Proficiency Assessment", url: "https://gemini.google.com/share/c5de9bd6641f", type: 'link' },
  { id: '8', name: "Chinese Vocab", url: "https://gemini.google.com/share/81d0e55c07ed", type: 'link' },
  { id: '9', name: "Chinese VOICEMASTER", url: "https://gemini.google.com/share/b2d34d54d87c", type: 'link' },
  { id: '10', name: "LingoMaster AI", url: "https://gemini.google.com/share/fd02ac54a591", type: 'link' },
  { id: '11', name: "Daily Learning Hub", url: "https://gemini.google.com/share/db3f597143ca", type: 'link' },
];

const defaultNewsViLinks = [
  { id: 'news-1', name: "VnExpress", url: "https://vnexpress.net", type: 'link' },
  { id: 'news-2', name: "Tuổi Trẻ", url: "https://tuoitre.vn", type: 'link' },
  { id: 'news-3', name: "Thanh Niên", url: "https://thanhnien.vn", type: 'link' },
  { id: 'news-4', name: "Báo Mới", url: "https://baomoi.com", type: 'link' },
  { id: 'news-5', name: "Zing News", url: "https://zingnews.vn", type: 'link' },
  { id: 'news-6', name: "Dân Trí", url: "https://dantri.com.vn", type: 'link' },
  { id: 'news-7', name: "Vietnamnet", url: "https://vietnamnet.vn", type: 'link' },
  { id: 'news-8', name: "CafeF", url: "https://cafef.vn", type: 'link' },
  { id: 'news-9', name: "Cafebiz", url: "https://cafebiz.vn", type: 'link' },
  { id: 'news-10', name: "Kenh14", url: "https://kenh14.vn", type: 'link' },
  { id: 'news-11', name: "2sao", url: "https://www.2sao.vn", type: 'link' },
  { id: 'news-12', name: "Yan News", url: "https://yan.vn", type: 'link' },
  { id: 'news-13', name: "Afamily", url: "https://afamily.vn", type: 'link' },
];

const defaultMarEnLinks = [
  { id: 'mar-1', name: 'Search Engine Journal', url: 'https://www.searchenginejournal.com/', type: 'link' },
  { id: 'mar-2', name: 'Search Engine Land', url: 'https://searchengineland.com/', type: 'link' },
  { id: 'mar-3', name: 'Moz Blog', url: 'https://moz.com/blog', type: 'link' },
  { id: 'mar-4', name: 'Ahrefs Blog', url: 'https://ahrefs.com/blog', type: 'link' },
  { id: 'mar-5', name: 'Backlinko', url: 'https://backlinko.com/blog', type: 'link' },
  { id: 'mar-6', name: 'Search Engine Roundtable', url: 'https://www.seroundtable.com/', type: 'link' },
  { id: 'mar-7', name: 'SEMrush Blog', url: 'https://www.semrush.com/blog/', type: 'link' },
  { id: 'mar-8', name: 'MarTech', url: 'https://martech.org/', type: 'link' },
  { id: 'mar-9', name: 'Marketing Land', url: 'https://marketingland.com/', type: 'link' },
  { id: 'mar-10', name: 'Chief Marketing Technologist', url: 'https://chiefmartec.com/', type: 'link' },
  { id: 'mar-11', name: 'Google Marketing Platform Blog', url: 'https://www.blog.google/products/marketingplatform/', type: 'link' },
  { id: 'mar-12', name: 'The Keyword (Google)', url: 'https://www.thekeyword.co/', type: 'link' },
  { id: 'mar-13', name: 'PPC Hero', url: 'https://www.ppchero.com/', type: 'link' },
  { id: 'mar-14', name: 'WordStream Blog', url: 'https://www.wordstream.com/blog', type: 'link' },
  { id: 'mar-15', name: 'Search Engine Watch', url: 'https://www.searchenginewatch.com/', type: 'link' },
  { id: 'mar-16', name: 'Google Ads Blog', url: 'https://blog.google/products/ads/', type: 'link' },
  { id: 'mar-17', name: 'Meta Business Blog', url: 'https://www.facebook.com/business/news', type: 'link' },
  { id: 'mar-18', name: 'HubSpot Marketing Blog', url: 'https://blog.hubspot.com/marketing', type: 'link' },
  { id: 'mar-19', name: 'Neil Patel Blog', url: 'https://neilpatel.com/blog/', type: 'link' },
  { id: 'mar-20', name: 'Content Marketing Institute', url: 'https://contentmarketinginstitute.com/blog/', type: 'link' },
  { id: 'mar-21', name: 'Social Media Examiner', url: 'https://www.socialmediaexaminer.com/', type: 'link' },
  { id: 'mar-22', name: 'Marketing Dive', url: 'https://www.marketingdive.com/', type: 'link' },
  { id: 'mar-23', name: 'ConversionXL', url: 'https://cxl.com/blog/', type: 'link' },
  { id: 'mar-24', name: 'Reforge', url: 'https://www.reforge.com/blog', type: 'link' },
  { id: 'mar-25', name: 'Growth Hackers', url: 'https://growthhackers.com/', type: 'link' },
  { id: 'mar-26', name: 'Optimizely Blog', url: 'https://www.optimizely.com/insights/blog/', type: 'link' },
  { id: 'mar-27', name: 'Analytics Vidhya', url: 'https://www.analyticsvidhya.com/blog/', type: 'link' },
  { id: 'mar-28', name: 'Towards Data Science', url: 'https://towardsdatascience.com/', type: 'link' },
  { id: 'mar-29', name: 'Google Analytics Blog', url: 'https://blog.google/products/marketingplatform/analytics/', type: 'link' },
];

const defaultToolsWorkLinks = [
  { id: 'tool-w-1', name: 'Gen Key', url: 'https://gemini.google.com/share/52b39e41b289', type: 'link' },
  { id: 'tool-w-2', name: 'Key', url: 'https://gemini.google.com/share/64237d774b8c', type: 'link' },
  { id: 'tool-w-3', name: 'Content', url: 'https://gemini.google.com/share/619a5c76ec10', type: 'link' },
  { id: 'tool-w-4', name: 'Location', url: 'https://gemini.google.com/share/5717ed13cc66', type: 'link' },
  { id: 'tool-w-5', name: '2Fa', url: 'https://gemini.google.com/share/0e60cc1f231a', type: 'link' },
];

const defaultPassLinks = [
  { id: 'pass-1', name: 'GenPass', url: 'https://www.random.org/passwords/', type: 'link' },
  { id: 'pass-2', name: 'GenPass 2', url: 'https://www.lastpass.com/features/password-generator', type: 'link' },
];

const defaultMobileLinks = [
  { id: 'mob-1', name: 'TemPhone', url: 'https://quackr.io/', type: 'link' },
  { id: 'mob-2', name: 'TemPhone2', url: 'https://receive-smss.com/', type: 'link' },
  { id: 'mob-3', name: 'TemPhone3', url: 'https://anonymsms.com/', type: 'link' },
  { id: 'mob-4', name: 'TemPhone4', url: 'https://sms24.me/en', type: 'link' },
  { id: 'mob-5', name: 'VioTP', url: 'https://viotp.com/', type: 'link' },
  { id: 'mob-6', name: 'TempPhone 5', url: 'https://esimplus.me/temporary-numbers', type: 'link' },
];

const defaultPrompts = [
  { 
    id: 'note-1', 
    name: 'Fix Eng file', 
    content: 'Tổng hợp lỗi sai trong file, tổng hợp lại kiến thức và dạy tôi, câu bị gạch đi là tôi chọn, câu màu xanh đúng là đáp án, từ đó nhận biết lỗi sai của tôi trong câu, phân tích và giúp tôi khắc phục lỗ hỏng kiến thức đó, dạy tôi học từng kiến thức 1, tách nhỏ ra và đi qua từng phần, hỏi lại kiến thức từng phần trước khi qua phần tiếp theo.', 
    type: 'note' 
  }
];

const defaultGroups = [
  { id: 'group-learning-1', name: 'Learning', items: defaultLearningLinks },
  { id: 'group-news-vi-1', name: 'News - Vi', items: defaultNewsViLinks },
  { id: 'group-mar-en-1', name: 'Mar - En', items: defaultMarEnLinks },
  { id: 'group-tools-work-1', name: 'Tools Work', items: defaultToolsWorkLinks },
  { id: 'group-pass-1', name: 'Pass', items: defaultPassLinks },
  { id: 'group-mobile-1', name: 'Mobile', items: defaultMobileLinks },
  { id: 'group-note-study-1', name: 'Note Study', items: defaultPrompts }
];

export default function App() {
  // State for data
  const [groups, setGroups] = useState(() => {
    try {
      const saved = localStorage.getItem('linkManagerGroupsNeubrutalism_v7');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Error reading localStorage", e);
    }
    return defaultGroups;
  });

  const [activeGroupId, setActiveGroupId] = useState(groups[0]?.id || null);
  
  // State for UI interactions
  const [status, setStatus] = useState('idle');
  const [openMode, setOpenMode] = useState('tab');
  const [addMode, setAddMode] = useState('link');
  
  // State for inputs
  const [newGroupName, setNewGroupName] = useState('');
  const [newItemName, setNewItemName] = useState('');
  const [newLinkUrl, setNewLinkUrl] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');

  // State for Edit Mode
  const [editingItemId, setEditingItemId] = useState(null);
  const [editItemName, setEditItemName] = useState('');
  const [editItemContent, setEditItemContent] = useState('');
  
  const [toast, setToast] = useState(null);
  const [groupToDelete, setGroupToDelete] = useState(null);

  useEffect(() => {
    localStorage.setItem('linkManagerGroupsNeubrutalism_v7', JSON.stringify(groups));
  }, [groups]);

  const copyToClipboard = (text, successMessage = "COPIED!") => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setToast(successMessage);
      setTimeout(() => setToast(null), 3000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
    document.body.removeChild(textArea);
  };

  const handleAddGroup = (e) => {
    e.preventDefault();
    if (!newGroupName.trim()) return;
    const newGroup = {
      id: `group-${Date.now()}`,
      name: newGroupName.trim(),
      items: []
    };
    setGroups([...groups, newGroup]);
    setActiveGroupId(newGroup.id);
    setNewGroupName('');
  };

  const confirmDeleteGroup = () => {
    if (groupToDelete) {
      const newGroups = groups.filter(g => g.id !== groupToDelete);
      setGroups(newGroups);
      if (activeGroupId === groupToDelete) {
        setActiveGroupId(newGroups.length > 0 ? newGroups[0].id : null);
      }
      setGroupToDelete(null);
    }
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!activeGroupId) return;

    const newGroups = groups.map(g => {
      if (g.id === activeGroupId) {
        let currentItems = [...(g.items || [])];
        let currentCount = currentItems.length;

        if (addMode === 'link') {
          if (!newLinkUrl.trim()) return g;
          const urls = newLinkUrl.split(/[\s,]+/).filter(u => u.trim() !== '');
          if (urls.length === 0) return g;

          urls.forEach((urlRaw, index) => {
            let url = urlRaw.trim();
            if (!url.startsWith('http://') && !url.startsWith('https://')) {
              url = 'https://' + url;
            }
            let linkName = newItemName.trim();
            if (!linkName || urls.length > 1) {
              currentCount++;
              linkName = `Link ${currentCount}`;
            }
            currentItems.push({ id: `item-${Date.now()}-${index}`, name: linkName, url, type: 'link' });
          });
        } else {
          if (!newNoteContent.trim()) return g;
          let noteName = newItemName.trim();
          if (!noteName) {
            currentCount++;
            noteName = `Note ${currentCount}`;
          }
          currentItems.push({ id: `item-${Date.now()}`, name: noteName, content: newNoteContent, type: 'note' });
        }
        
        return { ...g, items: currentItems };
      }
      return g;
    });

    setGroups(newGroups);
    setNewItemName('');
    setNewLinkUrl('');
    setNewNoteContent('');
  };

  const handleDeleteItem = (itemId) => {
    const newGroups = groups.map(g => {
      if (g.id === activeGroupId) {
        return { ...g, items: g.items.filter(i => i.id !== itemId) };
      }
      return g;
    });
    setGroups(newGroups);
  };

  const handleStartEdit = (item) => {
    setEditingItemId(item.id);
    setEditItemName(item.name);
    setEditItemContent(item.type === 'note' ? item.content : item.url);
  };

  const handleSaveEdit = (itemId, type) => {
    if (!editItemContent.trim()) return;

    const newGroups = groups.map(g => {
      if (g.id === activeGroupId) {
        return {
          ...g,
          items: g.items.map(i => {
            if (i.id === itemId) {
              return {
                ...i,
                name: editItemName.trim() || i.name,
                ...(type === 'note' ? { content: editItemContent.trim() } : { url: editItemContent.trim() })
              };
            }
            return i;
          })
        };
      }
      return g;
    });
    setGroups(newGroups);
    setEditingItemId(null);
  };

  const activeGroup = groups.find(g => g.id === activeGroupId);
  const activeLinks = activeGroup?.items?.filter(item => item.type !== 'note') || [];
  
  const handleOpenAll = () => {
    if (activeLinks.length === 0) return;

    setStatus('opening');
    let popupBlocked = false;

    activeLinks.forEach((link, index) => {
      setTimeout(() => {
        let newWindow;
        if (openMode === 'window') {
          newWindow = window.open(link.url, '_blank', `popup=yes,width=1000,height=800,left=${index * 30},top=${index * 30}`);
        } else {
          newWindow = window.open(link.url, '_blank');
        }
        
        if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
          popupBlocked = true;
        }

        if (index === activeLinks.length - 1) {
          setStatus(popupBlocked ? 'blocked' : 'done');
          if (!popupBlocked) {
            setTimeout(() => setStatus('idle'), 4000);
          }
        }
      }, index * 200); 
    });
  };

  const handleCopyAllLinks = () => {
    if (activeLinks.length === 0) return;
    const urls = activeLinks.map(l => l.url).join('\n');
    copyToClipboard(urls, "COPIED ALL LINKS!");
  };

  const colors = ['bg-[#ffeaec]', 'bg-[#e2f1ff]', 'bg-[#fff5cc]', 'bg-[#e6ffe6]', 'bg-[#f4e6ff]'];

  return (
    <div 
      className="min-h-screen p-2 md:p-4 font-sans font-bold text-black selection:bg-black selection:text-[#00ff9d]"
      style={{
        backgroundColor: '#005bf0',
        backgroundImage: 'linear-gradient(#0050d4 2px, transparent 2px), linear-gradient(90deg, #0050d4 2px, transparent 2px)',
        backgroundSize: '40px 40px'
      }}
    >
      <div className="max-w-[98%] 2xl:max-w-7xl w-full mx-auto flex flex-col md:flex-row gap-4 h-[96vh]">
        
        {/* SIDEBAR: Group Management & Shortcuts */}
        <div className="w-full md:w-72 flex flex-col gap-3 h-full">
          
          <div className="bg-[#ffd400] border-4 border-black rounded-xl p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] shrink-0">
            <h2 className="text-xl font-black flex items-center gap-2 uppercase tracking-tight">
              <Folder size={24} className="stroke-[3]" />
              Workspaces
            </h2>
          </div>
          
          <div className="flex-1 bg-white border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col">
            
            <div className="p-3 border-b-4 border-black bg-[#e2f1ff] shrink-0">
              <form onSubmit={handleAddGroup} className="flex gap-2">
                <input 
                  type="text" 
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  placeholder="NEW GROUP..." 
                  className="flex-1 px-3 py-1.5 font-bold border-2 border-black rounded-lg outline-none focus:bg-[#ffd400] transition-colors text-sm"
                />
                <button 
                  type="submit"
                  disabled={!newGroupName.trim()}
                  className="bg-black text-white p-1.5 rounded-lg border-2 border-black hover:bg-[#ff4d85] hover:text-black disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-[2px_2px_0_0_#000] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
                >
                  <Plus size={20} className="stroke-[3]" />
                </button>
              </form>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-2.5 custom-scrollbar">
              {groups.map(group => {
                const totalItems = group.items?.length || 0;
                return (
                  <div 
                    key={group.id}
                    className={`group flex items-center justify-between p-2.5 rounded-lg cursor-pointer border-2 border-black transition-all ${
                      activeGroupId === group.id 
                        ? 'bg-[#00ff9d] shadow-[3px_3px_0_0_#000] translate-x-[-1px] translate-y-[-1px]' 
                        : 'bg-white hover:bg-slate-100 hover:shadow-[2px_2px_0_0_#000]'
                    }`}
                    onClick={() => setActiveGroupId(group.id)}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <SquareMenu size={18} className="stroke-[2.5]" />
                      <span className="truncate font-black text-base">{group.name}</span>
                      <span className="text-xs font-bold bg-black text-white px-1.5 py-0.5 rounded-md ml-1 flex gap-1">
                        {totalItems}
                      </span>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setGroupToDelete(group.id); }}
                      className="opacity-0 group-hover:opacity-100 text-black hover:bg-red-400 p-1 rounded-md border-2 border-transparent hover:border-black transition-all"
                      title="Delete Group"
                    >
                      <Trash2 size={16} className="stroke-[2.5]" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* QUICK LINKS / SHORTCUTS SECTION */}
            <div className="p-3 border-t-4 border-black bg-[#fff5cc] shrink-0">
              <h3 className="text-[11px] font-black uppercase text-slate-600 mb-2 tracking-wider">Quick Links</h3>
              <div className="grid grid-cols-2 gap-2">
                <a href="https://translate.google.com/details?sl=en&tl=vi&op=translate" target="_blank" rel="noopener noreferrer" className="col-span-1 bg-white border-2 border-black rounded-lg p-2 flex items-center justify-center gap-1.5 hover:bg-[#00ff9d] shadow-[2px_2px_0_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all text-xs font-black uppercase" title="Google Translate">
                  <Languages size={16} className="stroke-[2.5]" /> Translate
                </a>
                <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="col-span-1 bg-white border-2 border-black rounded-lg p-2 flex items-center justify-center gap-1.5 hover:bg-[#ff4d85] hover:text-white shadow-[2px_2px_0_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all text-xs font-black uppercase" title="YouTube">
                  <Youtube size={16} className="stroke-[2.5]" /> Youtube
                </a>
                <a href="https://www.google.com/search?sourceid=chrome&udm=50&aep=42&source=chrome.crn.rb" target="_blank" rel="noopener noreferrer" className="col-span-2 bg-white border-2 border-black rounded-lg p-2 flex items-center justify-center gap-1.5 hover:bg-black hover:text-white shadow-[2px_2px_0_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all text-xs font-black uppercase" title="Google Search AI">
                  <Search size={16} className="stroke-[2.5]" /> Ask Google AI
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 bg-white border-4 border-black rounded-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col overflow-hidden relative">
          
          <div className="h-3 bg-black w-full flex items-center px-4 gap-2 shrink-0">
            <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
          </div>

          {activeGroup ? (
            <>
              <div className="p-4 border-b-4 border-black bg-[#ffeaec] shrink-0">
                <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                  <div>
                    <div className="inline-block bg-black text-[#00ff9d] px-2 py-0.5 rounded text-xs font-black mb-1 uppercase tracking-widest border-2 border-black shadow-[2px_2px_0_0_#00ff9d]">
                      Current Workspace
                    </div>
                    <h1 className="text-2xl font-black uppercase tracking-tighter" style={{ textShadow: '1px 1px 0px #fff' }}>
                      {activeGroup.name}
                    </h1>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <div className="flex bg-black p-1 rounded-xl gap-1">
                      <button 
                        onClick={() => setOpenMode('tab')}
                        className={`px-3 py-1.5 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 border-2 border-black transition-all ${openMode === 'tab' ? 'bg-[#ffd400] shadow-[2px_2px_0_0_#fff]' : 'bg-slate-700 text-white hover:bg-slate-600 border-transparent'}`}
                      >
                        <ExternalLink size={16} className="stroke-[2.5]" /> Tabs
                      </button>
                      <button 
                        onClick={() => setOpenMode('window')}
                        className={`px-3 py-1.5 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 border-2 border-black transition-all ${openMode === 'window' ? 'bg-[#ffd400] shadow-[2px_2px_0_0_#fff]' : 'bg-slate-700 text-white hover:bg-slate-600 border-transparent'}`}
                        title="Force open as Popups"
                      >
                        <AppWindow size={16} className="stroke-[2.5]" /> Windows
                      </button>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={handleCopyAllLinks}
                        disabled={activeLinks.length === 0}
                        className={`flex items-center justify-center gap-1.5 px-3 py-2 font-black uppercase text-xs border-4 border-black rounded-lg transition-all ${activeLinks.length === 0 ? 'bg-slate-300 text-slate-500 cursor-not-allowed' : 'bg-white text-black hover:bg-[#e2f1ff] shadow-[4px_4px_0_0_#000] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] hover:-translate-y-0.5 hover:-translate-x-0.5'}`}
                        title="Copy URLs of all LINKS"
                      >
                        <Copy size={16} className="stroke-[2.5]" /> COPY
                      </button>

                      <button
                        onClick={handleOpenAll}
                        disabled={status === 'opening' || activeLinks.length === 0}
                        className={`relative flex items-center justify-center gap-1.5 px-5 py-2 min-w-[140px] font-black uppercase text-sm border-4 border-black rounded-lg transition-all ${activeLinks.length === 0 ? 'bg-slate-300 text-slate-500 cursor-not-allowed' : status === 'opening' ? 'bg-[#ffd400] shadow-[2px_2px_0_0_#000] cursor-wait' : 'bg-[#ff4d85] text-white hover:bg-[#ff2065] shadow-[4px_4px_0_0_#000] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[6px_6px_0_0_#000]'}`}
                      >
                        {status === 'opening' ? (
                          <><div className="w-4 h-4 border-4 border-black border-t-white rounded-full animate-spin"></div> LAUNCHING...</>
                        ) : (
                          <><Rocket size={18} className="stroke-[2.5]" /> LAUNCH ({activeLinks.length})</>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {status === 'blocked' && (
                  <div className="mt-3 flex items-start gap-2 text-black bg-[#ffd400] px-3 py-2 rounded-lg border-2 border-black shadow-[2px_2px_0_0_#000] font-bold text-sm">
                    <AlertTriangle size={18} className="shrink-0 stroke-[2.5]" />
                    <p>POPUPS BLOCKED! Click the icon in your address bar to <strong>"Always allow pop-ups"</strong>.</p>
                  </div>
                )}
              </div>

              <div className="flex-1 overflow-y-auto p-3 sm:p-4 bg-white custom-scrollbar">
                
                <div className="bg-[#e6ffe6] rounded-xl border-4 border-black shadow-[3px_3px_0_0_#000] mb-4 overflow-hidden shrink-0">
                  <div className="flex border-b-4 border-black">
                    <button 
                      onClick={() => setAddMode('link')}
                      className={`flex-1 py-1.5 font-black uppercase text-xs border-r-4 border-black flex justify-center items-center gap-1.5 transition-colors ${addMode === 'link' ? 'bg-[#ffd400]' : 'bg-[#f1f5f9] hover:bg-slate-200'}`}
                    >
                      <LinkIcon size={16} className="stroke-[3]" /> Add Link(s)
                    </button>
                    <button 
                      onClick={() => setAddMode('note')}
                      className={`flex-1 py-1.5 font-black uppercase text-xs flex justify-center items-center gap-1.5 transition-colors ${addMode === 'note' ? 'bg-[#ffd400]' : 'bg-[#f1f5f9] hover:bg-slate-200'}`}
                    >
                      <Type size={16} className="stroke-[3]" /> Add Note / Prompt
                    </button>
                  </div>

                  <form onSubmit={handleAddItem} className="p-3 flex flex-col md:flex-row gap-2 bg-[#e6ffe6]">
                    <div className="flex-[1] flex flex-col gap-1">
                      <label className="text-[10px] font-black uppercase">Name (Optional)</label>
                      <input 
                        type="text" 
                        value={newItemName}
                        onChange={(e) => setNewItemName(e.target.value)}
                        placeholder={addMode === 'link' ? "e.g. Grammar Test" : "e.g. Fix English"} 
                        className="w-full px-3 py-1.5 text-sm font-bold border-2 border-black rounded-lg outline-none focus:bg-[#ffd400] transition-colors h-[38px]"
                      />
                    </div>
                    
                    {addMode === 'link' ? (
                      <div className="flex-[2] flex flex-col gap-1">
                        <label className="text-[10px] font-black uppercase">URL(s) - Paste multiple</label>
                        <textarea 
                          value={newLinkUrl}
                          onChange={(e) => setNewLinkUrl(e.target.value)}
                          placeholder="https://..." 
                          className="w-full px-3 py-1.5 text-sm font-bold border-2 border-black rounded-lg outline-none focus:bg-[#ffd400] transition-colors resize-y min-h-[38px] h-[38px]"
                        />
                      </div>
                    ) : (
                      <div className="flex-[2] flex flex-col gap-1">
                        <label className="text-[10px] font-black uppercase">Note Content</label>
                        <textarea 
                          value={newNoteContent}
                          onChange={(e) => setNewNoteContent(e.target.value)}
                          placeholder="Type your note or prompt here..." 
                          className="w-full px-3 py-1.5 text-sm font-bold border-2 border-black rounded-lg outline-none focus:bg-[#ffd400] transition-colors resize-y min-h-[38px] h-[38px]"
                        />
                      </div>
                    )}

                    <div className="flex items-end">
                      <button 
                        type="submit"
                        disabled={addMode === 'link' ? !newLinkUrl.trim() : !newNoteContent.trim()}
                        className="h-[38px] px-6 bg-[#00ff9d] border-2 border-black rounded-lg font-black uppercase text-sm flex items-center justify-center gap-1.5 hover:bg-[#00e08a] shadow-[3px_3px_0_0_#000] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] disabled:opacity-50 transition-all w-full md:w-auto"
                      >
                        <Plus size={16} className="stroke-[3]" /> SAVE
                      </button>
                    </div>
                  </form>
                </div>

                {(!activeGroup.items || activeGroup.items.length === 0) ? (
                  <div className="text-center py-12 text-black border-4 border-dashed border-black rounded-2xl bg-slate-50">
                    <SquareMenu size={48} className="mx-auto mb-3 stroke-[1.5]" />
                    <p className="text-xl font-black uppercase mb-1">Workspace Empty</p>
                    <p className="text-sm font-medium">Add some links or notes above!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
                    {activeGroup.items.map((item, idx) => {
                      const isNote = item.type === 'note';
                      const isEditing = editingItemId === item.id;
                      
                      if (isEditing) {
                        return (
                          <div key={item.id} className={`${colors[idx % colors.length]} p-3 rounded-xl border-2 border-black shadow-[3px_3px_0_0_#000] flex flex-col gap-2`}>
                            <input
                              type="text"
                              value={editItemName}
                              onChange={(e) => setEditItemName(e.target.value)}
                              className="w-full px-2 py-1 text-sm font-bold border-2 border-black rounded outline-none focus:bg-[#ffd400]"
                              placeholder="Name..."
                            />
                            {isNote ? (
                              <textarea
                                value={editItemContent}
                                onChange={(e) => setEditItemContent(e.target.value)}
                                className="w-full px-2 py-1 text-sm font-bold border-2 border-black rounded outline-none focus:bg-[#ffd400] resize-y min-h-[40px]"
                                placeholder="Content..."
                              />
                            ) : (
                              <input
                                type="text"
                                value={editItemContent}
                                onChange={(e) => setEditItemContent(e.target.value)}
                                className="w-full px-2 py-1 text-sm font-bold border-2 border-black rounded outline-none focus:bg-[#ffd400]"
                                placeholder="URL..."
                              />
                            )}
                            <div className="flex gap-2 justify-end mt-1">
                              <button onClick={() => setEditingItemId(null)} className="px-3 py-1 bg-white border-2 border-black rounded-md text-xs font-black uppercase hover:bg-slate-200">Cancel</button>
                              <button onClick={() => handleSaveEdit(item.id, item.type)} className="px-3 py-1 bg-[#00ff9d] border-2 border-black rounded-md text-xs font-black uppercase hover:bg-[#00e08a]">Save</button>
                            </div>
                          </div>
                        );
                      }

                      return (
                        <div 
                          key={item.id} 
                          className={`${colors[idx % colors.length]} flex items-center justify-between p-3 rounded-xl border-2 border-black shadow-[3px_3px_0_0_#000] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[5px_5px_0_0_#000] transition-all group`}
                        >
                          <div className="flex items-center gap-3 overflow-hidden w-full pr-2">
                            <div className={`p-2 rounded-lg text-white border-2 border-black shadow-[2px_2px_0_0_#000] shrink-0 ${isNote ? 'bg-[#ff4d85]' : 'bg-black'}`}>
                              {isNote ? <FileText size={18} className="stroke-[2.5]" /> : <LinkIcon size={18} className="stroke-[2.5]" />}
                            </div>
                            <div className="overflow-hidden w-full">
                              <div className="flex items-center gap-2 mb-0.5">
                                <h3 className="font-black text-base truncate uppercase leading-tight">{item.name}</h3>
                                <span className="text-[9px] font-black uppercase tracking-wider px-1 py-0.5 border border-black rounded bg-white text-black shrink-0 leading-none">
                                  {isNote ? 'NOTE' : 'LINK'}
                                </span>
                              </div>
                              <p className="text-xs font-semibold opacity-80 truncate" title={isNote ? item.content : item.url}>
                                {isNote ? item.content : item.url}
                              </p>
                            </div>
                          </div>
                          
                          {/* Nút hành động (luôn hiện trên mobile, ẩn trên desktop cho đến khi hover) */}
                          <div className="flex items-center gap-1.5 shrink-0 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={() => copyToClipboard(isNote ? item.content : item.url, isNote ? "NOTE COPIED!" : "LINK COPIED!")}
                              className="bg-white p-1.5 border-2 border-black rounded-lg hover:bg-[#e2f1ff] shadow-[2px_2px_0_0_#000] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
                              title={isNote ? "Copy Note" : "Copy URL"}
                            >
                              <Copy size={16} className="stroke-[2.5]" />
                            </button>
                            
                            {!isNote && (
                              <a 
                                href={item.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="bg-white p-1.5 border-2 border-black rounded-lg hover:bg-[#ffd400] shadow-[2px_2px_0_0_#000] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
                                title="Open Link"
                              >
                                <ExternalLink size={16} className="stroke-[2.5]" />
                              </a>
                            )}

                            <button 
                              onClick={() => handleStartEdit(item)}
                              className="bg-white p-1.5 border-2 border-black rounded-lg hover:bg-[#fff5cc] shadow-[2px_2px_0_0_#000] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
                              title="Edit Item"
                            >
                              <Edit2 size={16} className="stroke-[2.5]" />
                            </button>

                            <button 
                              onClick={() => handleDeleteItem(item.id)}
                              className="bg-white p-1.5 border-2 border-black rounded-lg hover:bg-red-400 hover:text-black shadow-[2px_2px_0_0_#000] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
                              title="Delete Item"
                            >
                              <Trash2 size={16} className="stroke-[2.5]" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-[#fff5cc]">
              <Settings2 size={64} className="mb-4 stroke-[1.5]" />
              <h2 className="text-2xl font-black uppercase mb-2">Create a workspace</h2>
              <p className="font-bold text-base max-w-sm">Select a group from the sidebar or make a new one to start saving your links.</p>
            </div>
          )}
        </div>
      </div>
      
      {toast && (
        <div className="fixed bottom-8 right-8 md:bottom-12 md:right-12 bg-[#00ff9d] border-4 border-black px-5 py-3 rounded-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] z-50 flex items-center gap-2 transition-all" style={{ animation: 'bounce-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
          <Check size={24} className="stroke-[3]" />
          <span className="font-black text-lg uppercase tracking-wider">{toast}</span>
        </div>
      )}

      {groupToDelete && (
        <div className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setGroupToDelete(null)}>
          <div className="bg-[#ffeaec] border-4 border-black p-5 rounded-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] max-w-sm w-full" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-2 mb-3 text-black">
              <AlertTriangle size={28} className="stroke-[2.5] text-[#ff4d85]" />
              <h3 className="text-xl font-black uppercase">Delete Workspace?</h3>
            </div>
            <p className="font-bold text-base mb-5 text-slate-800">Are you sure you want to delete this workspace and all its links? This cannot be undone!</p>
            <div className="flex gap-3">
              <button
                onClick={() => setGroupToDelete(null)}
                className="flex-1 py-2.5 font-black uppercase text-sm border-4 border-black rounded-lg bg-white hover:bg-slate-200 shadow-[3px_3px_0_0_#000] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] transition-all"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteGroup}
                className="flex-1 py-2.5 font-black uppercase text-sm border-4 border-black rounded-lg bg-[#ff4d85] text-white hover:bg-[#ff2065] shadow-[3px_3px_0_0_#000] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f5f9; border-left: 2px solid #000; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #000; border-radius: 0px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #ff4d85; }
        
        @keyframes bounce-in {
          0% { transform: scale(0.8) translateY(20px); opacity: 0; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
      `}} />
    </div>
  );
}
