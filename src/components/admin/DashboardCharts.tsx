import React from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { SurveyResponse } from "@/types/survey";

interface Props {
  data: SurveyResponse[];
}

const COLORS = ['#FB7185', '#F43F5E', '#E11D48', '#BE123C', '#9F1239', '#881337'];

export const DashboardCharts = ({ data }: Props) => {
  // Processar dados para a Pergunta 1
  const firstPurchaseData = data.reduce((acc: any[], curr) => {
    const existing = acc.find(a => a.name === curr.first_purchase_reason);
    if (existing) existing.value++;
    else acc.push({ name: curr.first_purchase_reason, value: 1 });
    return acc;
  }, []);

  // Processar dados para Experiência Geral
  const experienceData = data.reduce((acc: any[], curr) => {
    const existing = acc.find(a => a.name === curr.overall_experience);
    if (existing) existing.value++;
    else acc.push({ name: curr.overall_experience, value: 1 });
    return acc;
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <h3 className="text-slate-800 font-semibold mb-6">Motivo da Primeira Compra</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={firstPurchaseData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" width={100} fontSize={12} stroke="#64748b" />
              <Tooltip cursor={{fill: '#F8FAFC'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Bar dataKey="value" fill="#FB7185" radius={[0, 4, 4, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <h3 className="text-slate-800 font-semibold mb-6">Experiência Geral</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={experienceData}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {experienceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};