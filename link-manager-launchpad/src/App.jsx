import React, { useState, useEffect } from 'react';

function App() {
  const [workspaces, setWorkspaces] = useState([
    {
      id: 1,
      name: 'Learning',
      links: [
        { id: 1, name: 'Vocab Quick Test', url: 'https://gemini.google.com/share/721fbc984110' },
        { id: 2, name: 'Grammar Test', url: 'https://gemini.google.com/share/5da0702a4509' },
        { id: 3, name: 'Create Grammar Lessons', url: 'https://gemini.google.com/share/d4c8b7a9680b' },
        { id: 4, name: 'English Test Generator', url: 'https://gemini.google.com/share/aa36d1055a93' },
        { id: 5, name: 'Structure & Phrase Practice', url: 'https://gemini.google.com/share/2cddbb886a0' },
        { id: 6, name: 'VocabQuizzer.AI', url: 'https://gemini.google.com/share/779f0fa4f271' },
      ]
    },
    {
      id: 2,
      name: 'News - Vi',
      links: [
        { id: 1, name: 'VnExpress', url: 'https://vnexpress.net' },
        { id: 2, name: 'Tuổi Trẻ', url: 'https://tuoitre.vn' },
        { id: 3, name: 'Thanh Niên', url: 'https://thanhnien.vn' },
        { id: 4, name: 'CafeF', url: 'https://cafef.vn' },
      ]
    },
    {
      id: 3,
      name: 'Mar - En',
      links: [
        { id: 1, name: 'Search Engine Journal', url: 'https://www.searchenginejournal.com/' },
        { id: 2, name: 'Search Engine Land', url: 'https://searchengineland.com/' },
        { id: 3, name: 'MarTech', url: 'https://martech.org/' },
        { id: 4, name: 'The Keyword', url: 'https://www.thekeyword.co/' },
      ]
    }
  ]);

  const [activeWorkspace, setActiveWorkspace] = useState(1);
  const [launchMode, setLaunchMode] = useState('tabs'); // 'tabs' or 'windows'
  const [newGroupName, setNewGroupName] = useState('');
  const [newLinkName, setNewLinkName] = useState('');
  const [newLinkUrl, setNewLinkUrl] = useState('');

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('linkManagerWorkspaces');
    if (saved) {
      setWorkspaces(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('linkManagerWorkspaces', JSON.stringify(workspaces));
  }, [workspaces]);

  const currentWorkspace = workspaces.find(w => w.id === activeWorkspace);

  const handleLaunchAll = () => {
    if (!currentWorkspace) return;
    
    const confirmed = window.confirm(
      `Bạn chắc chắn muốn mở ${currentWorkspace.links.length} links?`
    );
    
    if (!confirmed) return;

    currentWorkspace.links.forEach((link, index) => {
      setTimeout(() => {
        if (launchMode === 'windows') {
          window.open(link.url, '_blank', 'noopener,noreferrer');
        } else {
          window.open(link.url, '_blank');
        }
      }, index * 200); // 200ms delay between each link
    });
  };

  const handleAddLink = () => {
    if (!newLinkUrl.trim()) return;

    const urlsToAdd = newLinkUrl.split(/[\s\n]+/).filter(u => u.trim());
    
    const newLinks = urlsToAdd.map((url, index) => ({
      id: Date.now() + index,
      name: newLinkName.trim() || `Link ${currentWorkspace.links.length + index + 1}`,
      url: url.trim()
    }));

    setWorkspaces(workspaces.map(w => 
      w.id === activeWorkspace 
        ? { ...w, links: [...w.links, ...newLinks] }
        : w
    ));

    setNewLinkName('');
    setNewLinkUrl('');
  };

  const handleDeleteLink = (linkId) => {
    setWorkspaces(workspaces.map(w => 
      w.id === activeWorkspace 
        ? { ...w, links: w.links.filter(l => l.id !== linkId) }
        : w
    ));
  };

  const handleAddWorkspace = () => {
    if (!newGroupName.trim()) return;

    const newWorkspace = {
      id: Date.now(),
      name: newGroupName.trim(),
      links: []
    };

    setWorkspaces([...workspaces, newWorkspace]);
    setNewGroupName('');
    setActiveWorkspace(newWorkspace.id);
  };

  const handleCopyLinks = () => {
    const urls = currentWorkspace.links.map(l => l.url).join('\n');
    navigator.clipboard.writeText(urls);
    alert('Đã copy tất cả links!');
  };

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      gap: '20px'
    }}>
      {/* Sidebar */}
      <div style={{
        width: '360px',
        background: 'white',
        borderRadius: '20px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
        border: '4px solid black'
      }}>
        <div style={{
          background: '#FFD700',
          padding: '16px 24px',
          borderRadius: '12px',
          marginBottom: '20px',
          border: '3px solid black',
          fontWeight: 'bold',
          fontSize: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          📁 WORKSPACES
        </div>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          {workspaces.map(workspace => (
            <div
              key={workspace.id}
              onClick={() => setActiveWorkspace(workspace.id)}
              style={{
                padding: '16px 20px',
                marginBottom: '10px',
                borderRadius: '12px',
                border: '3px solid black',
                background: activeWorkspace === workspace.id ? '#00FF88' : 'white',
                cursor: 'pointer',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'all 0.2s'
              }}
            >
              📋 {workspace.name}
              <span style={{
                marginLeft: 'auto',
                background: 'black',
                color: 'white',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '14px'
              }}>
                {workspace.links.length}
              </span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
          <input
            type="text"
            placeholder="NEW GROUP..."
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddWorkspace()}
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: '8px',
              border: '2px solid #ddd',
              fontSize: '14px'
            }}
          />
          <button
            onClick={handleAddWorkspace}
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '8px',
              border: 'none',
              background: '#666',
              color: 'white',
              fontSize: '24px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            +
          </button>
        </div>
      </div>

      {/* Main Area */}
      <div style={{
        flex: 1,
        background: 'white',
        borderRadius: '20px',
        padding: '30px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
        border: '4px solid black',
        overflowY: 'auto'
      }}>
        {/* Header */}
        <div style={{ marginBottom: '30px' }}>
          <div style={{
            background: 'black',
            color: '#00FF88',
            padding: '8px 16px',
            borderRadius: '8px',
            display: 'inline-block',
            fontSize: '14px',
            fontWeight: 'bold',
            marginBottom: '10px'
          }}>
            CURRENT WORKSPACE
          </div>
          <h1 style={{
            fontSize: '48px',
            fontWeight: 'bold',
            margin: '10px 0 20px 0',
            textTransform: 'uppercase'
          }}>
            {currentWorkspace?.name}
          </h1>

          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            {/* Tabs/Windows Toggle */}
            <div style={{ display: 'flex', gap: '5px', background: 'black', padding: '5px', borderRadius: '10px' }}>
              <button
                onClick={() => setLaunchMode('tabs')}
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  border: 'none',
                  background: launchMode === 'tabs' ? 'white' : 'transparent',
                  color: launchMode === 'tabs' ? 'black' : 'white',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                🗂️ Tabs
              </button>
              <button
                onClick={() => setLaunchMode('windows')}
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  border: 'none',
                  background: launchMode === 'windows' ? '#FFD700' : 'transparent',
                  color: 'black',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                🪟 Windows
              </button>
            </div>

            {/* Copy Button */}
            <button
              onClick={handleCopyLinks}
              style={{
                padding: '10px 20px',
                borderRadius: '10px',
                border: '3px solid black',
                background: 'white',
                cursor: 'pointer',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              📋 COPY
            </button>

            {/* Launch Button */}
            <button
              onClick={handleLaunchAll}
              style={{
                padding: '16px 32px',
                borderRadius: '12px',
                border: '4px solid black',
                background: '#FF006E',
                color: 'white',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '18px',
                marginLeft: 'auto',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '4px 4px 0 black'
              }}
            >
              🚀 LAUNCH ALL ({currentWorkspace?.links.length || 0})
            </button>
          </div>
        </div>

        {/* Add Link Form */}
        <div style={{
          background: '#E8F5E9',
          padding: '20px',
          borderRadius: '12px',
          border: '3px solid black',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', gap: '15px' }}>
            <div style={{ flex: '1' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '12px' }}>
                NAME (OPTIONAL)
              </div>
              <input
                type="text"
                placeholder="e.g. Grammar Test"
                value={newLinkName}
                onChange={(e) => setNewLinkName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: '2px solid #333',
                  fontSize: '14px'
                }}
              />
            </div>
            <div style={{ flex: '2' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '12px' }}>
                URL(S) - PASTE MULTIPLE LINKS HERE
              </div>
              <textarea
                placeholder="https://... (Paste multiple links separated by space or newline)"
                value={newLinkUrl}
                onChange={(e) => setNewLinkUrl(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: '2px solid #333',
                  fontSize: '14px',
                  minHeight: '44px',
                  resize: 'vertical',
                  fontFamily: 'inherit'
                }}
              />
            </div>
            <button
              onClick={handleAddLink}
              style={{
                alignSelf: 'flex-end',
                padding: '12px 24px',
                borderRadius: '8px',
                border: 'none',
                background: '#00D9A0',
                color: 'white',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              + ADD
            </button>
          </div>
        </div>

        {/* Links List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {currentWorkspace?.links.map(link => (
            <div
              key={link.id}
              style={{
                padding: '16px 20px',
                background: '#FFF9E6',
                borderRadius: '12px',
                border: '3px solid black',
                display: 'flex',
                alignItems: 'center',
                gap: '15px'
              }}
            >
              <div style={{
                width: '40px',
                height: '40px',
                background: 'black',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px'
              }}>
                🔗
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 'bold', marginBottom: '4px', textTransform: 'uppercase' }}>
                  {link.name}
                </div>
                <div style={{ fontSize: '13px', color: '#666' }}>
                  {link.url}
                </div>
              </div>
              <button
                onClick={() => window.open(link.url, '_blank')}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  border: '2px solid black',
                  background: 'white',
                  cursor: 'pointer',
                  fontSize: '18px'
                }}
              >
                ↗️
              </button>
              <button
                onClick={() => handleDeleteLink(link.id)}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  border: '2px solid black',
                  background: 'white',
                  cursor: 'pointer',
                  fontSize: '18px'
                }}
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
