import React, { useState, useEffect } from 'react';
import { 
  Rocket, ExternalLink, AlertTriangle, Plus, Trash2, 
  Folder, Link as LinkIcon, AppWindow, SquareMenu, Settings2, Copy, Check
} from 'lucide-react';

const defaultLearningLinks = [
  { id: '1', name: "Vocab Quick Test", url: "https://gemini.google.com/share/721fbc984110" },
  { id: '2', name: "Grammar Test", url: "https://gemini.google.com/share/5da0702a4509" },
  { id: '3', name: "Create Grammar Lessons", url: "https://gemini.google.com/share/d4c8b7a9680b" },
  { id: '4', name: "English Test Generator", url: "https://gemini.google.com/share/aa36d1055a93" },
  { id: '5', name: "Structure & Phrase Practice", url: "https://gemini.google.com/share/2cddbbb886a0" },
  { id: '6', name: "VocabQuizzer.AI", url: "https://gemini.google.com/share/779f0fa4f271" },
  { id: '7', name: "Phonetic Ear", url: "https://gemini.google.com/share/508fd1e172cf" },
  { id: '12', name: "English Proficiency Assessment", url: "https://gemini.google.com/share/c5de9bd6641f" },
  { id: '8', name: "Chinese Vocab", url: "https://gemini.google.com/share/81d0e55c07ed" },
  { id: '9', name: "Chinese VOICEMASTER", url: "https://gemini.google.com/share/b2d34d54d87c" },
  { id: '10', name: "LingoMaster AI", url: "https://gemini.google.com/share/fd02ac54a591" },
  { id: '11', name: "Daily Learning Hub", url: "https://gemini.google.com/share/db3f597143ca" },
];

const defaultNewsViLinks = [
  { id: 'news-1', name: "VnExpress", url: "https://vnexpress.net" },
  { id: 'news-2', name: "Tuổi Trẻ", url: "https://tuoitre.vn" },
  { id: 'news-3', name: "Thanh Niên", url: "https://thanhnien.vn" },
  { id: 'news-4', name: "Báo Mới", url: "https://baomoi.com" },
  { id: 'news-5', name: "Zing News", url: "https://zingnews.vn" },
  { id: 'news-6', name: "Dân Trí", url: "https://dantri.com.vn" },
  { id: 'news-7', name: "Vietnamnet", url: "https://vietnamnet.vn" },
  { id: 'news-8', name: "CafeF", url: "https://cafef.vn" },
  { id: 'news-9', name: "Cafebiz", url: "https://cafebiz.vn" },
  { id: 'news-10', name: "Kenh14", url: "https://kenh14.vn" },
  { id: 'news-11', name: "2sao", url: "https://www.2sao.vn" },
  { id: 'news-12', name: "Yan News", url: "https://yan.vn" },
  { id: 'news-13', name: "Afamily", url: "https://afamily.vn" },
];

const defaultMarEnLinks = [
  { id: 'mar-1', name: 'Search Engine Journal', url: 'https://www.searchenginejournal.com/' },
  { id: 'mar-2', name: 'Search Engine Land', url: 'https://searchengineland.com/' },
  { id: 'mar-3', name: 'Moz Blog', url: 'https://moz.com/blog' },
  { id: 'mar-4', name: 'Ahrefs Blog', url: 'https://ahrefs.com/blog' },
  { id: 'mar-5', name: 'Backlinko', url: 'https://backlinko.com/blog' },
  { id: 'mar-6', name: 'Search Engine Roundtable', url: 'https://www.seroundtable.com/' },
  { id: 'mar-7', name: 'SEMrush Blog', url: 'https://www.semrush.com/blog/' },
  { id: 'mar-8', name: 'MarTech', url: 'https://martech.org/' },
  { id: 'mar-9', name: 'Marketing Land', url: 'https://marketingland.com/' },
  { id: 'mar-10', name: 'Chief Marketing Technologist', url: 'https://chiefmartec.com/' },
  { id: 'mar-11', name: 'Google Marketing Platform Blog', url: 'https://www.blog.google/products/marketingplatform/' },
  { id: 'mar-12', name: 'The Keyword (Google)', url: 'https://www.thekeyword.co/' },
  { id: 'mar-13', name: 'PPC Hero', url: 'https://www.ppchero.com/' },
  { id: 'mar-14', name: 'WordStream Blog', url: 'https://www.wordstream.com/blog' },
  { id: 'mar-15', name: 'Search Engine Watch', url: 'https://www.searchenginewatch.com/' },
  { id: 'mar-16', name: 'Google Ads Blog', url: 'https://blog.google/products/ads/' },
  { id: 'mar-17', name: 'Meta Business Blog', url: 'https://www.facebook.com/business/news' },
  { id: 'mar-18', name: 'HubSpot Marketing Blog', url: 'https://blog.hubspot.com/marketing' },
  { id: 'mar-19', name: 'Neil Patel Blog', url: 'https://neilpatel.com/blog/' },
  { id: 'mar-20', name: 'Content Marketing Institute', url: 'https://contentmarketinginstitute.com/blog/' },
  { id: 'mar-21', name: 'Social Media Examiner', url: 'https://www.socialmediaexaminer.com/' },
  { id: 'mar-22', name: 'Marketing Dive', url: 'https://www.marketingdive.com/' },
  { id: 'mar-23', name: 'ConversionXL', url: 'https://cxl.com/blog/' },
  { id: 'mar-24', name: 'Reforge', url: 'https://www.reforge.com/blog' },
  { id: 'mar-25', name: 'Growth Hackers', url: 'https://growthhackers.com/' },
  { id: 'mar-26', name: 'Optimizely Blog', url: 'https://www.optimizely.com/insights/blog/' },
  { id: 'mar-27', name: 'Analytics Vidhya', url: 'https://www.analyticsvidhya.com/blog/' },
  { id: 'mar-28', name: 'Towards Data Science', url: 'https://towardsdatascience.com/' },
  { id: 'mar-29', name: 'Google Analytics Blog', url: 'https://blog.google/products/marketingplatform/analytics/' },
];

const defaultGroups = [
  { id: 'group-learning-1', name: 'Learning', links: defaultLearningLinks },
  { id: 'group-news-vi-1', name: 'News - Vi', links: defaultNewsViLinks },
  { id: 'group-mar-en-1', name: 'Mar - En', links: defaultMarEnLinks }
];

export default function App() {
  // State for data
  const [groups, setGroups] = useState(() => {
    try {
      const saved = localStorage.getItem('linkManagerGroupsNeubrutalism_v3');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Error reading localStorage", e);
    }
    return defaultGroups;
  });

  const [activeGroupId, setActiveGroupId] = useState(groups[0]?.id || null);
  
  // State for UI interactions
  const [status, setStatus] = useState('idle'); // idle, opening, done, blocked
  const [openMode, setOpenMode] = useState('tab'); // 'tab', 'window'
  
  // State for inputs
  const [newGroupName, setNewGroupName] = useState('');
  const [newLinkName, setNewLinkName] = useState('');
  const [newLinkUrl, setNewLinkUrl] = useState('');
  
  const [toast, setToast] = useState(null);

  // Save to localStorage whenever groups change
  useEffect(() => {
    localStorage.setItem('linkManagerGroupsNeubrutalism_v3', JSON.stringify(groups));
  }, [groups]);

  // Group Handlers
  const handleAddGroup = (e) => {
    e.preventDefault();
    if (!newGroupName.trim()) return;
    const newGroup = {
      id: `group-${Date.now()}`,
      name: newGroupName.trim(),
      links: []
    };
    setGroups([...groups, newGroup]);
    setActiveGroupId(newGroup.id);
    setNewGroupName('');
  };

  const handleDeleteGroup = (groupId) => {
    if (confirm('Are you sure you want to delete this entire group?')) {
      const newGroups = groups.filter(g => g.id !== groupId);
      setGroups(newGroups);
      if (activeGroupId === groupId) {
        setActiveGroupId(newGroups.length > 0 ? newGroups[0].id : null);
      }
    }
  };

  // Link Handlers
  const handleAddLink = (e) => {
    e.preventDefault();
    if (!newLinkUrl.trim() || !activeGroupId) return;
    
    // Support adding multiple links separated by spaces, commas, or newlines
    const urls = newLinkUrl.split(/[\s,]+/).filter(u => u.trim() !== '');
    if (urls.length === 0) return;

    const newGroups = groups.map(g => {
      if (g.id === activeGroupId) {
        let currentLinks = [...g.links];
        let currentCount = currentLinks.length;

        urls.forEach((urlRaw, index) => {
          let url = urlRaw.trim();
          if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
          }
          
          let linkName = newLinkName.trim();
          
          // Auto-generate name if not provided or if pasting multiple links
          if (!linkName || urls.length > 1) {
            currentCount++;
            linkName = `Link ${currentCount}`;
          }

          currentLinks.push({ id: `link-${Date.now()}-${index}`, name: linkName, url });
        });
        
        return { ...g, links: currentLinks };
      }
      return g;
    });

    setGroups(newGroups);
    setNewLinkName('');
    setNewLinkUrl('');
  };

  const handleDeleteLink = (linkId) => {
    const newGroups = groups.map(g => {
      if (g.id === activeGroupId) {
        return { ...g, links: g.links.filter(l => l.id !== linkId) };
      }
      return g;
    });
    setGroups(newGroups);
  };

  // Open Handlers
  const handleOpenAll = () => {
    const activeGroup = groups.find(g => g.id === activeGroupId);
    if (!activeGroup || activeGroup.links.length === 0) return;

    setStatus('opening');
    let popupBlocked = false;

    activeGroup.links.forEach((link, index) => {
      setTimeout(() => {
        let newWindow;
        if (openMode === 'window') {
          // Thêm cờ popup=yes để cố gắng ép trình duyệt mở cửa sổ riêng
          newWindow = window.open(link.url, '_blank', `popup=yes,width=1000,height=800,left=${index * 30},top=${index * 30}`);
        } else {
          newWindow = window.open(link.url, '_blank');
        }
        
        if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
          popupBlocked = true;
        }

        if (index === activeGroup.links.length - 1) {
          setStatus(popupBlocked ? 'blocked' : 'done');
          if (!popupBlocked) {
            setTimeout(() => setStatus('idle'), 4000);
          }
        }
      }, index * 200); 
    });
  };

  const activeGroup = groups.find(g => g.id === activeGroupId);

  const handleCopyAll = () => {
    if (!activeGroup || activeGroup.links.length === 0) return;
    const urls = activeGroup.links.map(l => l.url).join('\n');
    
    const textArea = document.createElement("textarea");
    textArea.value = urls;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setToast("COPIED ALL LINKS!");
      setTimeout(() => setToast(null), 3000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
    document.body.removeChild(textArea);
  };

  // Brutalist Color Palette
  const colors = ['bg-[#ffeaec]', 'bg-[#e2f1ff]', 'bg-[#fff5cc]', 'bg-[#e6ffe6]', 'bg-[#f4e6ff]'];

  return (
    <div 
      className="min-h-screen p-4 md:p-8 font-sans font-bold text-black selection:bg-black selection:text-[#00ff9d]"
      style={{
        backgroundColor: '#005bf0', // Vibrant blue background
        backgroundImage: 'linear-gradient(#0050d4 2px, transparent 2px), linear-gradient(90deg, #0050d4 2px, transparent 2px)',
        backgroundSize: '40px 40px'
      }}
    >
      <div className="max-w-6xl w-full mx-auto flex flex-col md:flex-row gap-6 h-[85vh]">
        
        {/* SIDEBAR: Group Management */}
        <div className="w-full md:w-80 flex flex-col gap-4">
          
          <div className="bg-[#ffd400] border-4 border-black rounded-xl p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black flex items-center gap-2 uppercase tracking-tight">
              <Folder size={28} className="stroke-[3]" />
              Workspaces
            </h2>
          </div>
          
          {/* Group List Container */}
          <div className="flex-1 bg-white border-4 border-black rounded-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
              {groups.map(group => (
                <div 
                  key={group.id}
                  className={`group flex items-center justify-between p-3 rounded-lg cursor-pointer border-2 border-black transition-all ${
                    activeGroupId === group.id 
                      ? 'bg-[#00ff9d] shadow-[4px_4px_0_0_#000] translate-x-[-2px] translate-y-[-2px]' 
                      : 'bg-white hover:bg-slate-100 hover:shadow-[2px_2px_0_0_#000]'
                  }`}
                  onClick={() => setActiveGroupId(group.id)}
                >
                  <div className="flex items-center gap-2 truncate">
                    <SquareMenu size={20} className="stroke-[2.5]" />
                    <span className="truncate font-black text-lg">{group.name}</span>
                    <span className="text-xs font-bold bg-black text-white px-2 py-0.5 rounded-full ml-1">
                      {group.links.length}
                    </span>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleDeleteGroup(group.id); }}
                    className="opacity-0 group-hover:opacity-100 text-black hover:bg-red-400 p-1.5 rounded-md border-2 border-transparent hover:border-black transition-all"
                    title="Delete Group"
                  >
                    <Trash2 size={18} className="stroke-[2.5]" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Group Form */}
            <div className="p-4 border-t-4 border-black bg-[#e2f1ff]">
              <form onSubmit={handleAddGroup} className="flex gap-2">
                <input 
                  type="text" 
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  placeholder="NEW GROUP..." 
                  className="flex-1 px-3 py-2 font-bold border-2 border-black rounded-lg outline-none focus:bg-[#ffd400] transition-colors"
                />
                <button 
                  type="submit"
                  disabled={!newGroupName.trim()}
                  className="bg-black text-white p-2 rounded-lg border-2 border-black hover:bg-[#ff4d85] hover:text-black disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-[2px_2px_0_0_#000] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
                >
                  <Plus size={24} className="stroke-[3]" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT: Links in Active Group */}
        <div className="flex-1 bg-white border-4 border-black rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col overflow-hidden relative">
          
          {/* Header Strip Design Element */}
          <div className="h-4 bg-black w-full flex items-center px-4 gap-2">
            <div className="w-2 h-2 rounded-full bg-white"></div>
            <div className="w-2 h-2 rounded-full bg-white"></div>
            <div className="w-2 h-2 rounded-full bg-white"></div>
          </div>

          {activeGroup ? (
            <>
              {/* Top Control Area */}
              <div className="p-6 border-b-4 border-black bg-[#ffeaec]">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  
                  <div>
                    <div className="inline-block bg-black text-[#00ff9d] px-3 py-1 rounded-md text-sm font-black mb-2 uppercase tracking-widest border-2 border-black shadow-[2px_2px_0_0_#00ff9d]">
                      Current Workspace
                    </div>
                    <h1 className="text-4xl font-black uppercase tracking-tighter" style={{ textShadow: '2px 2px 0px #fff' }}>
                      {activeGroup.name}
                    </h1>
                  </div>

                  {/* Launch Controls */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    
                    {/* Mode Selector */}
                    <div className="flex bg-black p-1.5 rounded-xl gap-1">
                      <button 
                        onClick={() => setOpenMode('tab')}
                        className={`px-4 py-2 text-sm font-bold rounded-lg flex items-center justify-center gap-2 border-2 border-black transition-all ${openMode === 'tab' ? 'bg-[#ffd400] shadow-[2px_2px_0_0_#fff]' : 'bg-slate-700 text-white hover:bg-slate-600 border-transparent'}`}
                      >
                        <ExternalLink size={18} className="stroke-[2.5]" /> Tabs
                      </button>
                      <button 
                        onClick={() => setOpenMode('window')}
                        className={`px-4 py-2 text-sm font-bold rounded-lg flex items-center justify-center gap-2 border-2 border-black transition-all ${openMode === 'window' ? 'bg-[#ffd400] shadow-[2px_2px_0_0_#fff]' : 'bg-slate-700 text-white hover:bg-slate-600 border-transparent'}`}
                        title="Ép mở dạng Popup (Phụ thuộc vào trình duyệt)"
                      >
                        <AppWindow size={18} className="stroke-[2.5]" /> Windows
                      </button>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={handleCopyAll}
                        disabled={activeGroup?.links.length === 0}
                        className={`
                          flex items-center justify-center gap-2 px-4 py-3 
                          font-black uppercase text-sm border-4 border-black rounded-xl transition-all
                          ${activeGroup?.links.length === 0 ? 'bg-slate-300 text-slate-500 cursor-not-allowed' :
                            'bg-white text-black hover:bg-[#e2f1ff] shadow-[6px_6px_0_0_#000] active:shadow-none active:translate-x-[6px] active:translate-y-[6px] hover:-translate-y-1 hover:-translate-x-1'}
                        `}
                        title="Copy tất cả link để dán vào cửa sổ Ẩn danh"
                      >
                        <Copy size={20} className="stroke-[2.5]" /> COPY
                      </button>

                      <button
                        onClick={handleOpenAll}
                        disabled={status === 'opening' || activeGroup.links.length === 0}
                        className={`
                          relative flex items-center justify-center gap-2 px-8 py-3 min-w-[200px]
                          font-black uppercase text-lg border-4 border-black rounded-xl transition-all
                          ${activeGroup.links.length === 0 ? 'bg-slate-300 text-slate-500 cursor-not-allowed' :
                            status === 'opening' 
                            ? 'bg-[#ffd400] shadow-[4px_4px_0_0_#000] cursor-wait' 
                            : 'bg-[#ff4d85] text-white hover:bg-[#ff2065] shadow-[6px_6px_0_0_#000] active:shadow-none active:translate-x-[6px] active:translate-y-[6px] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0_0_#000]'}
                        `}
                      >
                        {status === 'opening' ? (
                          <><div className="w-5 h-5 border-4 border-black border-t-white rounded-full animate-spin"></div> LAUNCHING...</>
                        ) : (
                          <><Rocket size={24} className="stroke-[2.5]" /> LAUNCH ({activeGroup.links.length})</>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Popup Blocker Warning */}
                {status === 'blocked' && (
                  <div className="mt-4 flex items-start gap-3 text-black bg-[#ffd400] px-4 py-3 rounded-lg border-2 border-black shadow-[4px_4px_0_0_#000] font-bold">
                    <AlertTriangle size={24} className="shrink-0 stroke-[2.5]" />
                    <p>
                      POPUPS BLOCKED! Click the icon in your address bar to <strong>"Always allow pop-ups"</strong>.
                    </p>
                  </div>
                )}
              </div>

              {/* Link List Area */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-white custom-scrollbar">
                
                {/* Add New Link Form (Bulk Add Supported) */}
                <form onSubmit={handleAddLink} className="bg-[#e6ffe6] p-4 rounded-xl border-4 border-black shadow-[4px_4px_0_0_#000] mb-8 flex flex-col md:flex-row gap-3">
                  <div className="flex-[1] flex flex-col gap-1">
                    <label className="text-xs font-black uppercase">Name (Optional)</label>
                    <input 
                      type="text" 
                      value={newLinkName}
                      onChange={(e) => setNewLinkName(e.target.value)}
                      placeholder="e.g. Grammar Test" 
                      className="w-full px-4 py-3 font-bold border-2 border-black rounded-lg outline-none focus:bg-[#ffd400] transition-colors"
                    />
                  </div>
                  <div className="flex-[2] flex flex-col gap-1">
                    <label className="text-xs font-black uppercase">URL(s) - Paste multiple links here</label>
                    <textarea 
                      value={newLinkUrl}
                      onChange={(e) => setNewLinkUrl(e.target.value)}
                      placeholder="https://... (Paste multiple links separated by space or newline)" 
                      rows={2}
                      className="w-full px-4 py-2 font-bold border-2 border-black rounded-lg outline-none focus:bg-[#ffd400] transition-colors resize-y min-h-[52px]"
                    />
                  </div>
                  <div className="flex items-end">
                    <button 
                      type="submit"
                      disabled={!newLinkUrl.trim()}
                      className="h-[52px] px-8 bg-[#00ff9d] border-2 border-black rounded-lg font-black uppercase flex items-center justify-center gap-2 hover:bg-[#00e08a] shadow-[4px_4px_0_0_#000] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] disabled:opacity-50 transition-all w-full md:w-auto"
                    >
                      <Plus size={20} className="stroke-[3]" /> ADD
                    </button>
                  </div>
                </form>

                {/* The List */}
                {activeGroup.links.length === 0 ? (
                  <div className="text-center py-16 text-black border-4 border-dashed border-black rounded-2xl bg-slate-50">
                    <LinkIcon size={64} className="mx-auto mb-4 stroke-[1.5]" />
                    <p className="text-2xl font-black uppercase mb-2">No links yet</p>
                    <p className="text-lg font-medium">Drop your first link above!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                    {activeGroup.links.map((link, idx) => (
                      <div 
                        key={link.id} 
                        className={`${colors[idx % colors.length]} flex items-center justify-between p-4 rounded-xl border-2 border-black shadow-[4px_4px_0_0_#000] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0_0_#000] transition-all group`}
                      >
                        <div className="flex items-center gap-4 overflow-hidden">
                          <div className="bg-black p-2.5 rounded-lg text-white shadow-[2px_2px_0_0_#fff]">
                            <LinkIcon size={20} className="stroke-[2.5]" />
                          </div>
                          <div className="overflow-hidden">
                            <h3 className="font-black text-lg truncate uppercase">{link.name}</h3>
                            <p className="text-sm font-semibold opacity-70 truncate max-w-[200px] sm:max-w-[300px]">{link.url}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <a 
                            href={link.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-white p-2.5 border-2 border-black rounded-lg hover:bg-[#ffd400] shadow-[2px_2px_0_0_#000] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
                            title="Open single link"
                          >
                            <ExternalLink size={20} className="stroke-[2.5]" />
                          </a>
                          <button 
                            onClick={() => handleDeleteLink(link.id)}
                            className="bg-white p-2.5 border-2 border-black rounded-lg hover:bg-[#ff4d85] hover:text-white shadow-[2px_2px_0_0_#000] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
                            title="Remove link"
                          >
                            <Trash2 size={20} className="stroke-[2.5]" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#fff5cc]">
              <Settings2 size={80} className="mb-6 stroke-[1.5]" />
              <h2 className="text-3xl font-black uppercase mb-2">Create a workspace</h2>
              <p className="font-bold text-lg max-w-sm">Select a group from the sidebar or make a new one to start saving your links.</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-8 right-8 md:bottom-12 md:right-12 bg-[#00ff9d] border-4 border-black px-6 py-4 rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-50 flex items-center gap-3 transition-all" style={{ animation: 'bounce-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
          <Check size={28} className="stroke-[3]" />
          <span className="font-black text-xl uppercase tracking-wider">{toast}</span>
        </div>
      )}
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
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