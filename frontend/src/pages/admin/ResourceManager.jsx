import { useState, useEffect, useCallback } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { api } from "@/lib/api";
import { toast } from "sonner";

export default function ResourceManager({ resource, title, fields, publicEndpoint, adminListEndpoint }) {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null); // null | {} (new) | item
  const [form, setForm] = useState({});

  const load = useCallback(() => {
    api.get(adminListEndpoint || publicEndpoint).then((r) => setItems(r.data));
  }, [publicEndpoint, adminListEndpoint]);

  useEffect(() => { load(); }, [load]);

  const openEdit = (item) => {
    setEditing(item || {});
    const init = {};
    fields.forEach((f) => {
      let v = item?.[f.key];
      if (f.type === "list" && Array.isArray(v)) v = v.join("\n");
      init[f.key] = v ?? f.default ?? "";
    });
    setForm(init);
  };

  const save = async (e) => {
    e.preventDefault();
    const payload = {};
    fields.forEach((f) => {
      let v = form[f.key];
      if (f.type === "number") v = v === "" || v == null ? null : Number(v);
      if (f.type === "boolean") v = Boolean(v);
      if (f.type === "list") v = String(v || "").split("\n").map((s) => s.trim()).filter(Boolean);
      payload[f.key] = v;
    });
    try {
      if (editing?.id) {
        await api.put(`/admin/${resource}/${editing.id}`, payload);
        toast.success(`${title} updated`);
      } else {
        await api.post(`/admin/${resource}`, payload);
        toast.success(`${title} created`);
      }
      setEditing(null);
      load();
    } catch {
      toast.error("Save failed");
    }
  };

  const remove = async (item) => {
    if (!window.confirm(`Delete "${item[fields[0].key]}"?`)) return;
    await api.delete(`/admin/${resource}/${item.id}`);
    toast.success("Deleted");
    load();
  };

  const inputCls = "w-full px-3 py-2.5 min-h-[44px] rounded-md border border-slate-300 bg-white text-base focus:border-primary";
  const displayFields = fields.filter((f) => f.showInTable).slice(0, 4);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-2xl font-bold text-primary">{title}</h2>
        <button onClick={() => openEdit(null)} data-testid={`${resource}-add-button`}
          className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground font-semibold px-5 py-2.5 min-h-[44px] hover:brightness-110 transition-[filter]">
          <Plus className="w-4 h-4" aria-hidden="true" /> Add
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-x-auto">
        <table className="w-full text-left" data-testid={`${resource}-table`}>
          <thead className="bg-secondary text-primary text-sm">
            <tr>
              {displayFields.map((f) => <th key={f.key} className="px-4 py-3 font-semibold">{f.label}</th>)}
              <th className="px-4 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t border-slate-100">
                {displayFields.map((f) => (
                  <td key={f.key} className="px-4 py-3 text-slate-700 max-w-[280px] truncate">
                    {f.type === "boolean" ? (item[f.key] ? "Yes" : "No") : String(item[f.key] ?? "")}
                  </td>
                ))}
                <td className="px-4 py-3 text-right whitespace-nowrap">
                  <button onClick={() => openEdit(item)} aria-label="Edit" data-testid={`${resource}-edit-${item.id}`}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-md text-primary hover:bg-secondary transition-colors">
                    <Pencil className="w-4 h-4" /></button>
                  <button onClick={() => remove(item)} aria-label="Delete" data-testid={`${resource}-delete-${item.id}`}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-md text-red-600 hover:bg-red-50 transition-colors">
                    <Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
            {items.length === 0 && <tr><td colSpan={displayFields.length + 1} className="px-4 py-8 text-center text-slate-500">No items yet.</td></tr>}
          </tbody>
        </table>
      </div>

      {editing !== null && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-start justify-center overflow-y-auto p-4" onClick={() => setEditing(null)}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl my-8 p-8" onClick={(e) => e.stopPropagation()} data-testid={`${resource}-form-modal`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-xl font-bold text-primary">{editing?.id ? "Edit" : "New"} {title}</h3>
              <button onClick={() => setEditing(null)} aria-label="Close" className="w-10 h-10 inline-flex items-center justify-center rounded-md hover:bg-secondary"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={save} className="grid sm:grid-cols-2 gap-4">
              {fields.map((f) => (
                <div key={f.key} className={f.type === "textarea" || f.type === "list" ? "sm:col-span-2" : ""}>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5" htmlFor={`fld-${f.key}`}>{f.label}</label>
                  {f.type === "textarea" || f.type === "list" ? (
                    <textarea id={`fld-${f.key}`} rows={f.rows || 3} value={form[f.key]} required={f.required}
                      onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} className={inputCls}
                      placeholder={f.type === "list" ? "One per line" : ""} data-testid={`${resource}-field-${f.key}`} />
                  ) : f.type === "select" ? (
                    <select id={`fld-${f.key}`} value={form[f.key]} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} className={inputCls} data-testid={`${resource}-field-${f.key}`}>
                      {f.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  ) : f.type === "boolean" ? (
                    <label className="inline-flex items-center gap-2 min-h-[44px] cursor-pointer">
                      <input type="checkbox" checked={Boolean(form[f.key])} onChange={(e) => setForm({ ...form, [f.key]: e.target.checked })}
                        className="w-5 h-5 accent-[#1D3557]" data-testid={`${resource}-field-${f.key}`} />
                      <span className="text-slate-700">{f.label}</span>
                    </label>
                  ) : (
                    <input id={`fld-${f.key}`} type={f.type === "number" ? "number" : "text"} step="any" value={form[f.key]} required={f.required}
                      onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} className={inputCls} data-testid={`${resource}-field-${f.key}`} />
                  )}
                </div>
              ))}
              <div className="sm:col-span-2 flex justify-end gap-3 mt-2">
                <button type="button" onClick={() => setEditing(null)} className="px-6 py-3 min-h-[44px] rounded-full border border-slate-300 font-semibold text-slate-700 hover:bg-secondary transition-colors">Cancel</button>
                <button type="submit" data-testid={`${resource}-save-button`} className="px-8 py-3 min-h-[44px] rounded-full bg-primary text-primary-foreground font-semibold hover:brightness-110 transition-[filter]">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
