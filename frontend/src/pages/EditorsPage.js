import React, { useState, useEffect, useCallback } from 'react';
import { editorService } from '../services/api';
import './EditorsPage.css';

const EditorsPage = () => {
    const [editors, setEditors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredEditors, setFilteredEditors] = useState([]);
    const [form, setForm] = useState({ name: '', headquarters: '', foundedAt: '' });
    const [editingId, setEditingId] = useState(null);

    const loadEditors = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await editorService.getAll();
            setEditors(data);
        } catch (e) {
            setError('Erreur lors du chargement des éditeurs');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadEditors();
    }, [loadEditors]);

    useEffect(() => {
        if (!searchTerm.trim()) {
            setFilteredEditors(editors);
        } else {
            setFilteredEditors(
                editors.filter(e => 
                    e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    (e.headquarters && e.headquarters.toLowerCase().includes(searchTerm.toLowerCase()))
                )
            );
        }
    }, [editors, searchTerm]);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };



    const handleEdit = editor => {
        setForm({ 
            name: editor.name, 
            headquarters: editor.headquarters,
            foundedAt: editor.foundedAt ? editor.foundedAt.split('T')[0] : ''
        });
        setEditingId(editor.id);
    };

    const handleDelete = async id => {
        if (!window.confirm('Supprimer cet éditeur ?')) return;
        try {
            await editorService.delete(id);
            loadEditors();
        } catch (e) {
            setError('Erreur lors de la suppression');
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR');
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const formData = {
                ...form,
                foundedAt: form.foundedAt ? new Date(form.foundedAt).toISOString().split('T')[0] : null
            };
            
            if (editingId) {
                await editorService.update(editingId, formData);
            } else {
                await editorService.create(formData);
            }
            setForm({ name: '', headquarters: '', foundedAt: '' });
            setEditingId(null);
            loadEditors();
        } catch (e) {
            setError('Erreur lors de la sauvegarde de l\'éditeur');
        }
    };

    return (
        <div className="editors-page-container">
            <h2>🏢 Liste des éditeurs</h2>
            
            <input
                type="text"
                placeholder="Rechercher un éditeur..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="search-bar"
            />

            {error && <div className="error-message">{error}</div>}

            {loading ? (
                <div className="loading">Chargement...</div>
            ) : (
                <table className="editors-table">
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Siège</th>
                            <th>Date de fondation</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEditors.map(editor => (
                            <tr key={editor.id}>
                                <td>{editor.name}</td>
                                <td>{editor.headquarters}</td>
                                <td>{formatDate(editor.foundedAt)}</td>
                                <td>
                                    <button onClick={() => handleEdit(editor)} className="btn-edit">
                                        ✏
                                    </button>
                                    <button onClick={() => handleDelete(editor.id)} className="btn-delete">
                                        🗑
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <h3>{editingId ? 'Modifier' : 'Ajouter'} un éditeur</h3>
            <form onSubmit={handleSubmit} className="editor-form">
                <input
                    type="text"
                    name="name"
                    placeholder="Nom de l'éditeur"
                    value={form.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="headquarters"
                    placeholder="Siège social"
                    value={form.headquarters}
                    onChange={handleChange}
                    required
                />
                <input
                    type="date"
                    name="foundedAt"
                    placeholder="Date de fondation"
                    value={form.foundedAt}
                    onChange={handleChange}
                />
                <button type="submit" className="btn-save">
                    {editingId ? 'Enregistrer' : 'Ajouter'}
                </button>
                {editingId && (
                    <button 
                        type="button" 
                        onClick={() => {
                            setForm({ name: '', headquarters: '', foundedAt: '' });
                            setEditingId(null);
                        }} 
                        className="btn-cancel"
                    >
                        Annuler
                    </button>
                )}
            </form>
        </div>
    );
};

export default EditorsPage;
