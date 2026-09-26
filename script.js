// Pre-configured Templates Data
const templates = {
  garbage: {
    objectives: "- Establish community waste collection points across high-density areas.\n- Conduct weekly recycling awareness workshops for residents.\n- Provide sanitation gear and employment opportunities for local youth workers.",
    outcomes: "- 40% reduction in uncollected residential solid waste within 6 months.\n- Creation of 15 sustainable local collection jobs.\n- Improved hygiene standards and reduced vector-borne health risks.",
    donors: [
      { name: "Global Environment Facility (GEF) Small Grants", url: "https://sgp.undp.org/" },
      { name: "UN Environment Programme (UNEP) Grants", url: "https://www.unep.org/work-with-us/funding-and-partnerships" },
      { name: "GlobalGiving Waste Management Projects", url: "https://www.globalgiving.org/" }
    ]
  },
  boychild: {
    objectives: "- Provide life-skills mentoring and vocational guidance for vulnerable young boys.\n- Set up community safe spaces for sports, mental health support, and peer group counseling.\n- Address school dropout rates through targeted educational sponsorship and tutoring.",
    outcomes: "- Mentorship of 150 young boys over a 12-month period.\n- 25% increase in school retention rates among enrolled participants.\n- Strengthened community leadership and reduction in risky behavior engagement.",
    donors: [
      { name: "UNICEF Youth & Child Development Grants", url: "https://www.unicef.org/partnerships" },
      { name: "Global Fund for Children", url: "https://globalfundforchildren.org/" },
      { name: "Funds for NGOs Youth Empowerment Portal", url: "https://www.fundsforngos.org/" }
    ]
  }
};

// DOM Elements
const templateSelect = document.getElementById('templateSelect');
const orgNameInput = document.getElementById('organizationName');
const locationInput = document.getElementById('targetLocation');
const budgetInput = document.getElementById('budget');
const objectivesInput = document.getElementById('projectObjectives');
const outcomesInput = document.getElementById('expectedOutcomes');
const proposalOutput = document.getElementById('proposalOutput');
const donorLinksContainer = document.getElementById('donorLinksContainer');
const copyBtn = document.getElementById('copyBtn');
const printBtn = document.getElementById('printBtn');
const printActionBtn = document.getElementById('printActionBtn');
const saveActionBtn = document.getElementById('saveActionBtn');
const exportMenu = document.getElementById('exportMenu');

// Load dynamic template content & donor links based on selection
function loadTemplate() {
  const selectedType = templateSelect.value;
  objectivesInput.value = '';
  outcomesInput.value = templates[selectedType].outcomes;
  
  updateDonorLinks(selectedType);
  generateProposal();
}

function getObjectiveTextForPreview(type) {
  return templates[type].objectives;
}

// Render dynamic donor links
function updateDonorLinks(type) {
  const donorList = templates[type].donors;
  donorLinksContainer.innerHTML = '';

  donorList.forEach(donor => {
    const linkAnchor = document.createElement('a');
    linkAnchor.href = donor.url;
    linkAnchor.target = '_blank';
    linkAnchor.rel = 'noopener noreferrer';
    linkAnchor.className = 'donor-link-item';
    linkAnchor.innerHTML = `<span>${donor.name}</span> ↗`;
    donorLinksContainer.appendChild(linkAnchor);
  });
}

// Generate Live Proposal Text
function generateProposal() {
  const type = templateSelect.value;
  const ngoName = orgNameInput.value.trim() || '[NGO Name]';
  const location = locationInput.value.trim() || '[Target Location]';
  const budget = budgetInput.value ? `$${budgetInput.value}` : '[Budget Amount]';
  const objectives = objectivesInput.value.trim() ? objectivesInput.value : getObjectiveTextForPreview(type);
  const outcomes = outcomesInput.value;

  const title = type === 'garbage' 
    ? 'PROJECT PROPOSAL: SUSTAINABLE COMMUNITY GARBAGE COLLECTION & SANITATION' 
    : 'PROJECT PROPOSAL: BOY CHILD EMPOWERMENT & MENTORSHIP PROGRAM';

  const contextText = type === 'garbage'
    ? `Unmanaged waste poses severe public health and environmental risks in ${location}. ${ngoName} proposes a structured waste collection and education initiative to build cleaner, healthier neighborhoods.`
    : `Young boys in ${location} frequently face social neglect, leading to high dropout rates and limited career opportunities. ${ngoName} aims to address these challenges through targeted interventions.`;

  const proposalText = `
${title}

1. EXECUTIVE SUMMARY
Organization: ${ngoName}
Location: ${location}
Requested Budget: ${budget}

2. PROJECT CONTEXT & RATIONALE
${contextText}

3. PROJECT OBJECTIVES
${objectives}

4. EXPECTED OUTCOMES & IMPACT
${outcomes}

5. BUDGET & SUSTAINABILITY
Total Funding Required: ${budget}
${ngoName} will partner with local leaders and municipal entities in ${location} to ensure long-term community ownership beyond the initial funding cycle.
  `.trim();

  proposalOutput.innerText = proposalText;
}

// Copy to Clipboard Functionality
function copyToClipboard() {
  const text = proposalOutput.innerText;
  navigator.clipboard.writeText(text).then(() => {
    alert('Proposal text copied to clipboard!');
  });
}

function saveProposal() {
  const text = proposalOutput.innerText;
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'grant-bridge-proposal.txt';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function toggleExportMenu() {
  exportMenu.classList.toggle('hidden');
}

// Event Listeners
templateSelect.addEventListener('change', loadTemplate);
orgNameInput.addEventListener('input', generateProposal);
locationInput.addEventListener('input', generateProposal);
budgetInput.addEventListener('input', generateProposal);
objectivesInput.addEventListener('input', generateProposal);
outcomesInput.addEventListener('input', generateProposal);

copyBtn.addEventListener('click', copyToClipboard);
printBtn.addEventListener('click', toggleExportMenu);
printActionBtn.addEventListener('click', () => {
  exportMenu.classList.add('hidden');
  window.print();
});
saveActionBtn.addEventListener('click', () => {
  exportMenu.classList.add('hidden');
  saveProposal();
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.export-wrapper') && !event.target.closest('#printBtn')) {
    exportMenu.classList.add('hidden');
  }
});

// Initialize page on startup
window.addEventListener('DOMContentLoaded', loadTemplate);