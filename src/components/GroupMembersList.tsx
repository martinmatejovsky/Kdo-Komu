import type {Group} from "../assets/types.ts";

interface Properties {
    group: Group
}

function GroupMembersList({group}: Properties) {
    return (
        <section className={'page-group__members'}>
            <h2>Lidé</h2>
            <p>
                {group.members.map((u) => u.name).join(', ')}
            </p>
        </section>
    )
}

export default GroupMembersList