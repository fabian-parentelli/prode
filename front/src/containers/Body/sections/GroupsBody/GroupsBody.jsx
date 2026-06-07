import './groupsBody.css';
import { Spinner } from 'fara-comp-react';
import { useEffect, useState } from 'react';
import { useAlertContext } from '@/context/AlertContext.jsx';
import { getGroupsApi } from '@/helpers/groups/groups.api.js';
import GroupCard from '@/components/tools/GroupCard/GroupCard.jsx';
import GroupFilter from '@/components/tools/GroupFilter/GroupFilter.jsx';

const GroupsBody = () => {

    const { showAlert } = useAlertContext();

    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedGroup, setSelectedGroup] = useState('');

    useEffect(() => {
        const fetchGroups = async () => {
            const response = await getGroupsApi();
            if (response.status === 'success') {
                setGroups(response.result);
                if (response.result.length > 0 && !selectedGroup) {
                    setSelectedGroup(response.result[0].name);
                };
            } else showAlert(response.error, 'error');
            setLoading(false);
        }; fetchGroups();
    }, []);

    const currentGroup = groups.find(g => g.name === selectedGroup);

    if (loading) return <div className="groupsBody"><Spinner color='#69C34E' size='35px' /></div>;
    return (
        <div className="groupsBody">
            <h3 className="groupsBody-title">Grupos</h3>

            <GroupFilter selectedGroup={selectedGroup} onSelect={setSelectedGroup} showAll={false} />

            {currentGroup
                ? <GroupCard group={currentGroup} />
                : <p className="groupsBody-empty">Seleccioná un grupo para ver sus posiciones.</p>
            }
        </div>
    );
};

export default GroupsBody;