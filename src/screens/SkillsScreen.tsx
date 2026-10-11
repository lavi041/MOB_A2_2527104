import React from 'react';
import Screen from '../components/Screen';
import Card from '../components/Card';
import { ChipRow } from '../components/Chip';
import TimelineItemView from '../components/TimelineItemView';
import { EDUCATION, SKILL_GROUPS } from '../data/portfolio';

export default function SkillsScreen() {
  return (
    <Screen>
      {SKILL_GROUPS.map((group) => (
        <Card key={group.title} title={group.title}>
          <ChipRow items={group.skills} />
        </Card>
      ))}
      <Card title="Education and training">
        {EDUCATION.map((item, i) => (
          <TimelineItemView key={item.id} item={item} last={i === EDUCATION.length - 1} />
        ))}
      </Card>
    </Screen>
  );
}
