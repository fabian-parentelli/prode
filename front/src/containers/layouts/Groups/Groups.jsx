import './groups.css';
import { useEffect, useState } from 'react';
import { Spinner } from 'fara-comp-react';
import { useAlertContext } from '@/context/AlertContext.jsx';
import { getGroupsApi } from '@/helpers/groups/groups.api.js';
import GroupFilter from '@/components/tools/GroupFilter/GroupFilter.jsx';
import GroupCard from '@/components/tools/GroupCard/GroupCard.jsx';

const Groups = () => {

    const { showAlert } = useAlertContext();

    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedGroup, setSelectedGroup] = useState('');

    useEffect(() => {
        const fetchGroups = async () => {
            const response = await getGroupsApi();
            if (response.status === 'success') setGroups(response.result);
            else showAlert(response.error, 'error');
            setLoading(false);
        }; fetchGroups();
    }, []);

    const filteredGroups = (selectedGroup
        ? groups.filter(g => g.name === selectedGroup)
        : groups
    ).sort((a, b) => a.name.localeCompare(b.name));

    if (loading) return <div className="groups flex-center"><Spinner color='#69C34E' size='50px' /></div>;
    return (
        <div className="groups">
            <h2 className="groups-title">Grupos</h2>

            <GroupFilter selectedGroup={selectedGroup} onSelect={setSelectedGroup} showAll={true} />

            <div className="groups-list">
                {filteredGroups.map(group => (
                    <GroupCard key={group._id} group={group} />
                ))}
            </div>
        </div>
    );
};

export default Groups;